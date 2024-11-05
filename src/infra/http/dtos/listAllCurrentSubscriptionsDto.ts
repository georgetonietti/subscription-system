import { ApiProperty } from '@nestjs/swagger'

export class ListAllCurrentSubscriptionsDTO {
  @ApiProperty()
  codigo: string

  @ApiProperty()
  codApp: string

  @ApiProperty()
  codCli: string

  @ApiProperty()
  inicioVigencia: Date

  @ApiProperty()
  fimVigencia: Date | null
}
