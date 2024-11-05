import { AssinaturaRepository } from '../repositories/assinaturaRepository'
import { Injectable } from '@nestjs/common'
import { Either, left, right } from '@/core/either'
import { SubscriptionNotFoundError } from '@/core/errors/errors/subscriptionNotFound'

interface GetSubscriptionByIdUseCaseRequest {
  codigoAssinatura: string
}

type GetSubscriptionByIdUseCaseResponse = Either<
  SubscriptionNotFoundError,
  {
    status: string
  }
>

@Injectable()
export class GetSubscriptionByIdUseCase {
  constructor(private assinaturaRepository: AssinaturaRepository) {}

  async execute({
    codigoAssinatura,
  }: GetSubscriptionByIdUseCaseRequest): Promise<GetSubscriptionByIdUseCaseResponse> {
    const status = await this.assinaturaRepository.findById(codigoAssinatura)

    if (!status) {
      return left(new SubscriptionNotFoundError())
    }

    return right({ status })
  }
}
