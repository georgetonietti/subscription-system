import { UseCaseError } from '@/core/errors/useCaseError'

export class SubscriptionNotFoundError extends Error implements UseCaseError {
  constructor() {
    super('Assinatura não encontrado.')
  }
}
