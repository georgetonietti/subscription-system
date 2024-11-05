import { ApiProperty } from '@nestjs/swagger'

export class RegisterApplicationDTO {
  @ApiProperty()
  nome: string

  @ApiProperty()
  custoMensal: number
}
