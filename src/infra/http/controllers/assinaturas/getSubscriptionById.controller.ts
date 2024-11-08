import { BadRequestException, Controller, Get, Param } from '@nestjs/common'
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger'
import { isSubscriptionValidDto } from '../../dtos/getClientSubscriptionDto'
import { GetSubscriptionByIdUseCase } from '@/domain/application/useCases/getSubscriptionById'

@Controller('/assinvalidas/:id')
@ApiTags('Assinaturas')
export class GetSubscriptionByIdController {
  constructor(private getSubscriptionByIdUseCase: GetSubscriptionByIdUseCase) {}

  @Get()
  @ApiOperation({
    summary:
      'Retorna, a partir de o código de uma assinatura, se a assinatura é ativa ou cancelada.',
  })
  @ApiResponse({
    status: 200,
    description: 'Active or canceled return',
    type: [isSubscriptionValidDto],
  })
  @ApiResponse({ status: 400, description: 'Assinatura não encontrada' })
  async handle(@Param('id') id: string) {
    console.log('codigoAssinatura:', id)

    const result = await this.getSubscriptionByIdUseCase.execute({
      codigoAssinatura: id,
    })

    if (result.isLeft()) {
      throw new BadRequestException(result.value.message)
    }

    const status = result.value.status

    return {
      status,
    }
  }
}
