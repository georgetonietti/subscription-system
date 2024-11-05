import { Injectable } from '@nestjs/common'
import { EventEmitter2 } from '@nestjs/event-emitter'

export class PaymentEvent {
  constructor(
    public readonly dataPagamento: Date,
    public readonly codAssinatura: string,
    public readonly valorPago: number,
  ) {}
}

@Injectable()
export class PaymentEventsService {
  constructor(private eventEmitter: EventEmitter2) {}

  emitPaymentEvent(event: PaymentEvent) {
    this.eventEmitter.emit('payment.received', event)
  }
}
