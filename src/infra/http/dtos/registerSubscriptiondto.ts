import { ApiProperty } from '@nestjs/swagger'

export class RegisterSubscriptionDTO {
  @ApiProperty()
  codApp: string

  @ApiProperty()
  codCli: string
}
