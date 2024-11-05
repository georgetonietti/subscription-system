import { ApiProperty } from '@nestjs/swagger'

class AplicativoDto {
  @ApiProperty()
  nome: string

  @ApiProperty()
  custoMensal: number
}

export class SubscriptionDto {
  @ApiProperty()
  codigoCliente: string

  @ApiProperty({ type: AplicativoDto })
  codigoAplicativo: AplicativoDto

  @ApiProperty()
  dataInicio: string

  @ApiProperty()
  dataFim: string

  @ApiProperty()
  status: string
}

export class isSubscriptionValidDto {
  @ApiProperty()
  status: string
}
