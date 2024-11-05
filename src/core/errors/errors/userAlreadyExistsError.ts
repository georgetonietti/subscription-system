import { UseCaseError } from '@/core/errors/useCaseError'

export class UserAlreadyExistsError extends Error implements UseCaseError {
  constructor() {
    super('Email já é o cadastrado.')
  }
}
