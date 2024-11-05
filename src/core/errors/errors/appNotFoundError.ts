import { UseCaseError } from '@/core/errors/useCaseError'

export class AppNotFoundError extends Error implements UseCaseError {
  constructor() {
    super('Aplicativo não encontrado')
  }
}
