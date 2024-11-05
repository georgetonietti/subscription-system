import { ApiProperty } from '@nestjs/swagger'

export class listAllAppsDTO {
  @ApiProperty()
  codigo: string

  @ApiProperty()
  nome: string

  @ApiProperty()
  custoMensal: number
}
