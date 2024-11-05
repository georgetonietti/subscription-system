import { UseCaseError } from '@/core/errors/useCaseError'

export class EmailOrNameAlreadyRegisteredError
  extends Error
  implements UseCaseError
{
  constructor() {
    super('Email ou nome que você informou já é o cadastrado.')
  }
}
