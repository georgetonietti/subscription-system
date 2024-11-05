import { UseCaseError } from '@/core/errors/useCaseError'

export class ClientNotFoundError extends Error implements UseCaseError {
  constructor() {
    super('Cliente não encontrado.')
  }
}
