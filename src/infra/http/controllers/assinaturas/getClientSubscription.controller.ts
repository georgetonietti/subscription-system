import { BadRequestException, Controller, Get, Param } from '@nestjs/common'
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger'
import { SubscriptionDto } from '../../dtos/getClientSubscriptionDto'
import { GetClientSubscriptionUseCase } from '@/domain/application/useCases/getClientSubscription'
import { AssinaturaWithStatusPresenter } from '../../presenters/subscriptionPresenter'

@Controller('/servcad/asscli/:codcli')
@ApiTags('Assinaturas')
export class GetClientSubscriptionController {
  constructor(
    private getClientSubscriptionUseCase: GetClientSubscriptionUseCase,
  ) {}

  @Get()
  @ApiOperation({
    summary: 'Retorna a lista das assinaturas do cliente informado',
  })
  @ApiResponse({
    status: 200,
    description: 'Sucesso',
    type: [SubscriptionDto],
  })
  @ApiResponse({ status: 400, description: 'Cliente não cadatrado.' })
  async handle(@Param('codcli') codcli: string) {
    const result = await this.getClientSubscriptionUseCase.execute({
      codigoCliente: codcli,
    })

    if (result.isLeft()) {
      throw new BadRequestException(result.value.message)
    }

    const assinaturas = result.value.assinaturas

    return {
      assinaturas: assinaturas.map(AssinaturaWithStatusPresenter.toHTTP),
    }
  }
}
