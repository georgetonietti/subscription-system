import { Controller } from '@nestjs/common'
import { MessagePattern, Payload } from '@nestjs/microservices'

@Controller()
export class PaymentMicroserviceController {
  @MessagePattern('payment')
  getPayment(@Payload() message: any) {
    console.log(message)
  }
}
