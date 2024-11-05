import { BadRequestException, Body, Controller, Post } from '@nestjs/common'
import { z } from 'zod'
import { ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger'
import { EventEmitter2, OnEvent } from '@nestjs/event-emitter'
import { RegisterSubscriptionDTO } from '../../dtos/registerSubscriptiondto'
// import { PaymentServiceEvent } from '../../../events/payments/events/payment-service.event'
import { RegisterSubscriptionUseCase } from '@/domain/application/useCases/registerSubscription'
import { CreateAssinaturaPresenter } from '../../presenters/subscriptionPresenter'
import { PrismaService } from '@/infra/database/prisma/prisma.service'
import { PaymentEvent } from '@/infra/events/payments/events/paymentService.event'

const registerSubscriptionBodySchema = z.object({
  codApp: z.string().uuid(),
  codCli: z.string().uuid(),
})

type RegisterSubscriptionBodySchema = z.infer<
  typeof registerSubscriptionBodySchema
>

@Controller('/servcad/assinaturas')
@ApiTags('Assinaturas')
export class RegisterSubscriptionController {
  constructor(
    private registerSubscrition: RegisterSubscriptionUseCase,
    private eventEmitter: EventEmitter2,
    private prisma: PrismaService,
  ) {}

  @ApiBody({
    type: RegisterSubscriptionDTO,
  })
  @Post()
  @ApiOperation({ summary: 'Cria uma assinatura válida.' })
  async handle(@Body() body: RegisterSubscriptionBodySchema) {
    const { codApp, codCli } = registerSubscriptionBodySchema.parse(body)

    const result = await this.registerSubscrition.execute({
      codApp,
      codCli,
    })

    if (result.isLeft()) {
      throw new BadRequestException(result.value.message)
    }

    const { assinatura } = result.value

    // evento de pagamento do serviço de cadastramento
    const pagamentoEvent: PaymentEvent = {
      dataPagamento: new Date(),
      codAssinatura: String(assinatura.codigo),
      valorPago: 0, // Como é uma assinatura gratuita inicialmente, o valor pago é zero (7 dias)
    }
    this.eventEmitter.emit('payment.received', pagamentoEvent)

    return {
      assinatura: CreateAssinaturaPresenter.toHTTP(assinatura),
    }
  }

  @OnEvent('payment.received')
  async handlePagamentoServicoCadastramento(event: PaymentEvent) {
    // Obtenha a assinatura pelo código
    const assinatura = await this.prisma.assinatura.findUnique({
      where: {
        codigo: event.codAssinatura,
      },
    })

    if (assinatura) {
      console.log('Evento de pagamento')

      // Atualize o status da assinatura diretamente
      await this.prisma.assinatura.update({
        where: {
          codigo: event.codAssinatura,
        },
        data: {
          status: 'ativa',
        },
      })
    } else {
      console.error('Assinatura não encontrada:', event.codAssinatura)
    }
  }
}
