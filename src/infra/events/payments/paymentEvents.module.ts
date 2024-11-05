import { Module } from '@nestjs/common'
import { PaymentEventsService } from './events/paymentService.event'
import { PaymentMicroserviceController } from './events/paymentController'

@Module({
  providers: [PaymentEventsService],
  controllers: [PaymentMicroserviceController],
})
export class PaymentEventsModule {}
