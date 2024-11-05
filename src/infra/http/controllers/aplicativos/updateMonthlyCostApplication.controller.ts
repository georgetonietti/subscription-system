import {
  BadRequestException,
  Body,
  Controller,
  Param,
  Patch,
} from '@nestjs/common'
import { z } from 'zod'
import {
  ApiOperation,
  ApiTags,
  ApiResponse,
  ApiBody,
  ApiProperty,
} from '@nestjs/swagger'
import { EditAppMonthlyCostUseCase } from '@/domain/application/useCases/editAppMonthlyCost'
import { CreateAppPresenter } from '../../presenters/appPresenter'

const updateMonthlyCostApplicationBodySchema = z.object({
  custoMensal: z.number(),
})

type UpdateMonthlyCostApplicationBodySchema = z.infer<
  typeof updateMonthlyCostApplicationBodySchema
>

class UpdateBodySwagger {
  @ApiProperty()
  custoMensal: number
}

@Controller('/servcad/aplicativos/:idAplicativo')
@ApiTags('Aplicativos')
export class UpdateMonthlyCostApplicationControlller {
  constructor(private editAppMonthlyCostUseCase: EditAppMonthlyCostUseCase) {}

  @ApiBody({
    type: UpdateBodySwagger,
  })
  @Patch()
  @ApiOperation({
    summary: 'Atualizar o custo mensal do aplicativo',
  })
  @ApiResponse({
    status: 400,
    description: 'Aplicativo não encontrado.',
  })
  @ApiResponse({
    status: 409,
    description:
      'Está tentando atualizar o dado com o mesmo valor já cadastrado.',
  })
  async handle(
    @Param('idAplicativo') idAplicativo: string,
    @Body() body: UpdateMonthlyCostApplicationBodySchema,
  ) {
    const { custoMensal } = updateMonthlyCostApplicationBodySchema.parse(body)

    const result = await this.editAppMonthlyCostUseCase.execute({
      codigo: idAplicativo,
      custoMensal,
    })

    if (result.isLeft()) {
      throw new BadRequestException(result.value.message)
    }

    const { aplicativo } = result.value

    return {
      aplicativo: CreateAppPresenter.toHTTP(aplicativo),
    }
  }
}
