import { ApiProperty } from '@nestjs/swagger'

export class listAllClientsDTO {
  @ApiProperty()
  codigo: string

  @ApiProperty()
  nome: string

  @ApiProperty()
  email: string
}
