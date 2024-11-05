import { Controller, Get, Param } from '@nestjs/common'
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger'
import { ListAllCurrentSubscriptionsDTO } from '../../dtos/listAllCurrentSubscriptionsDto'
import { ListAllSubscriptionUseCase } from '@/domain/application/useCases/listAllSubscription'

@Controller('/servcad/assinaturas/:tipo')
@ApiTags('Assinaturas')
export class ListAllCurrentSubscriptionsController {
  constructor(private listAllSubscriptionUseCase: ListAllSubscriptionUseCase) {}

  @Get()
  @ApiOperation({
    summary:
      'Retorna uma lista das assinaturas ativas, canceladas e de todas cadastradas',
  })
  @ApiResponse({
    status: 200,
    description: 'Sucesso',
    type: [ListAllCurrentSubscriptionsDTO],
  })
  @ApiResponse({ status: 400, description: 'Tipo informado não existente' })
  async handle(@Param('tipo') tipoParam: 'TODAS' | 'ATIVAS' | 'CANCELADAS') {
    const tipo = (tipoParam as string).toUpperCase() as
      | 'TODAS'
      | 'ATIVAS'
      | 'CANCELADAS'

    const result = await this.listAllSubscriptionUseCase.execute({ tipo })

    if (result.isLeft()) {
      throw new Error()
    }

    const assinaturas = result.value.assinaturas

    return {
      assinaturas: assinaturas.map((assinatura) => ({
        codigoAssinatura: assinatura.codigoAssinatura,
        codigoCliente: assinatura.codigoCliente,
        codigoAplicativo: assinatura.codigoAplicativo,
        dataInicio: assinatura.dataInicio,
        dataEncerramento: assinatura.dataEncerramento,
        status: assinatura.status,
      })),
    }
  }
}
