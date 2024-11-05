import { Controller, Get } from '@nestjs/common'
import { z } from 'zod'
import { ApiOperation, ApiTags, ApiResponse } from '@nestjs/swagger'
import { listAllAppsDTO } from '../../dtos/listAllAppsDto'
import { ListAllAppsUseCase } from '@/domain/application/useCases/listAllApps'
import { AppPresenter } from '../../presenters/appPresenter'

const appResponse = z.object({
  codigo: z.string().uuid(),
  nome: z.string(),
  custoMensal: z.number(),
  createdAt: z.date(),
})

const appsResponse = z.object({
  aplicativos: z.array(appResponse),
})

type AppsResponse = z.infer<typeof appsResponse>

@Controller('/servcad/aplicativos')
@ApiTags('Aplicativos')
export class ListAllAppsController {
  constructor(private listAllAppsUseCase: ListAllAppsUseCase) {}

  @Get()
  @ApiOperation({
    summary: 'Retorna uma lista de todos os aplicativos cadastrados.',
  })
  @ApiResponse({
    status: 200,
    description: 'Sucesso',
    type: [listAllAppsDTO],
  })
  async handle(): Promise<AppsResponse> {
    const result = await this.listAllAppsUseCase.execute()

    if (result.isLeft()) {
      throw new Error()
    }

    const aplicativos = result.value.aplicativos

    return { aplicativos: aplicativos.map(AppPresenter.toHTTP) }
  }
}
