import { ApiProperty } from '@nestjs/swagger'

class ClienteDto {
  @ApiProperty()
  codigo: string

  @ApiProperty()
  nome: string

  @ApiProperty()
  email: string
}

class AplicativoDto {
  @ApiProperty()
  codigo: string

  @ApiProperty()
  nome: string

  @ApiProperty()
  custoMensal: number
}

export class ApplicationSubscriptionDTO {
  @ApiProperty()
  codigoAssinatura: string

  @ApiProperty({ type: ClienteDto })
  codigoCliente: ClienteDto

  @ApiProperty({ type: AplicativoDto })
  codigoAplicativo: AplicativoDto

  @ApiProperty()
  dataInicio: string

  @ApiProperty()
  dataFim: string

  @ApiProperty()
  status: string
}
