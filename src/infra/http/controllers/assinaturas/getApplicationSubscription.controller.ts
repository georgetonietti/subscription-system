import { BadRequestException, Controller, Get, Param } from '@nestjs/common'
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger'
import { ApplicationSubscriptionDTO } from '../../dtos/getApplicationSubscriptionDto'
import { GetApplicationSubscriptionUseCase } from '@/domain/application/useCases/getApplicationSubscription'
import { AssinaturaWithStatusPresenter } from '../../presenters/subscriptionPresenter'

@Controller('/servcad/assapp/:codapp')
@ApiTags('Assinaturas')
export class GetApplicationSubscriptionController {
  constructor(
    private getApplicationSubscriptionUseCase: GetApplicationSubscriptionUseCase,
  ) {}

  @Get()
  @ApiOperation({
    summary: 'Retorna a lista das assinaturas do cliente informado',
  })
  @ApiResponse({
    status: 200,
    description: 'Sucesso',
    type: [ApplicationSubscriptionDTO],
  })
  @ApiResponse({ status: 400, description: 'Aplicativo não cadatrado.' })
  async handle(@Param('codapp') codapp: string) {
    const result = await this.getApplicationSubscriptionUseCase.execute({
      codigoAplicativo: codapp,
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
