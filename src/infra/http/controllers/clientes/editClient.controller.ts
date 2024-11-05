import {
  BadRequestException,
  Controller,
  Patch,
  Param,
  Body,
} from '@nestjs/common'
import {
  ApiBody,
  ApiOperation,
  ApiProperty,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger'
import { z } from 'zod'
import { listAllClientsDTO } from '../../dtos/listAllClientsDto'
import { EditClientUseCase } from '@/domain/application/useCases/editClient'
import { CreateClientPresenter } from '../../presenters/clientPresenter'

const updateClientBodySchema = z.object({
  nome: z.string(),
  email: z.string().email(),
})

type UpdateClientBodySchema = z.infer<typeof updateClientBodySchema>

class UpdateBodySwagger {
  @ApiProperty()
  nome: string

  @ApiProperty()
  email: string
}

@Controller('/servcad/client/:id')
@ApiTags('Cliente')
export class EditClientController {
  constructor(private editClientUseCase: EditClientUseCase) {}

  @ApiBody({
    type: UpdateBodySwagger,
  })
  @Patch()
  @ApiOperation({
    summary: 'Edita os dados cadastrados por um cliente.',
  })
  @ApiResponse({
    status: 200,
    description: 'Sucesso',
    type: listAllClientsDTO,
  })
  @ApiResponse({
    status: 400,
    description: 'Usuário não encontrado',
  })
  async handle(@Param('id') id: string, @Body() body: UpdateClientBodySchema) {
    const { nome, email } = updateClientBodySchema.parse(body)

    const result = await this.editClientUseCase.execute({
      codigo: id,
      email,
      nome,
    })

    if (result.isLeft()) {
      throw new BadRequestException(result.value.message)
    }

    const { cliente } = result.value

    return {
      cliente: CreateClientPresenter.toHTTP(cliente),
    }
  }
}
