import { Body, ConflictException, Controller, Post } from '@nestjs/common'
import { z } from 'zod'
import { ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger'
import { RegisterApplicationDTO } from '../../dtos/registerApplicationDto'
import { CreateAppPresenter } from '../../presenters/appPresenter'
import { RegisterApplicationUseCase } from '@/domain/application/useCases/registerApplication'

const registerApplicationBodySchema = z.object({
  nome: z.string(),
  custoMensal: z.number(),
})

type RegisterApllicationBodySchema = z.infer<
  typeof registerApplicationBodySchema
>

@Controller('/servcad/aplicativos')
@ApiTags('Aplicativos')
export class RegisterApllicationController {
  constructor(private registerApplicationUseCase: RegisterApplicationUseCase) {}

  @ApiBody({
    type: RegisterApplicationDTO,
  })
  @Post()
  @ApiOperation({ summary: 'Cria um aplicativo.' })
  async handle(@Body() body: RegisterApllicationBodySchema) {
    const { nome, custoMensal } = registerApplicationBodySchema.parse(body)

    const result = await this.registerApplicationUseCase.execute({
      nome,
      custoMensal,
    })

    if (result.isLeft()) {
      throw new ConflictException('Aplicativo já cadastrado em nosso sistema.')
    }

    const { aplicativo } = result.value

    return {
      aplicativo: CreateAppPresenter.toHTTP(aplicativo),
    }
  }
}
