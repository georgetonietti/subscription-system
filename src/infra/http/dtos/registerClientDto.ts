import { ApiProperty } from '@nestjs/swagger'

export class RegisterClienteDTO {
  @ApiProperty()
  nome: string

  @ApiProperty()
  email: string
}
