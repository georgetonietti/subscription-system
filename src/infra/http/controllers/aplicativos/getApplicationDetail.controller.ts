import { BadRequestException, Controller, Get, Param } from '@nestjs/common'
import { ApiOperation, ApiTags, ApiResponse } from '@nestjs/swagger'
import { listAllAppsDTO } from '../../dtos/listAllAppsDto'
import { GetApplicationDetailByIdCase } from '@/domain/application/useCases/getApplicationDetailById'
import { AppPresenter } from '../../presenters/appPresenter'

@Controller('/servcad/aplicativos/:id')
@ApiTags('Aplicativos')
export class GetApplicationDetailByIdController {
  constructor(
    private getApplicationDetailByIdCase: GetApplicationDetailByIdCase,
  ) {}

  @Get()
  @ApiOperation({
    summary: 'Retorna os detalhes de um aplicativo em específico',
  })
  @ApiResponse({
    status: 200,
    description: 'Sucesso',
    type: listAllAppsDTO,
  })
  @ApiResponse({
    status: 400,
    description: 'Aplicativo não encontrado.',
  })
  async handle(@Param('id') id: string) {
    const result = await this.getApplicationDetailByIdCase.execute({
      codigo: id,
    })

    if (result.isLeft()) {
      throw new BadRequestException(result.value.message)
    }

    const app = result.value.aplicativo

    return {
      app: AppPresenter.toHTTP(app),
    }
  }
}
