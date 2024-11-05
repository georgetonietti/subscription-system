import { Assinatura } from '@/domain/enterprise/entities/assinaturas'
import { AssinaturaRepository } from '../repositories/assinaturaRepository'
import { Injectable } from '@nestjs/common'
import { Either, left, right } from '@/core/either'
import { ClienteRepository } from '../repositories/clienteRepository'
import { AplicativoRepository } from '../repositories/aplicativoRepository'
import { ResourceNotFoundError } from '@/core/errors/errors/resourceNotFound'

interface RegisterSubscriptionUseCaseRequest {
  codApp: string
  codCli: string
}

type RegisterSubscriptionUseCaseResponse = Either<
  ResourceNotFoundError,
  {
    assinatura: Assinatura
  }
>

@Injectable()
export class RegisterSubscriptionUseCase {
  constructor(
    private assinaturaRepository: AssinaturaRepository,
    private clienteRepository: ClienteRepository,
    private aplicativoRepository: AplicativoRepository,
  ) {}

  async execute({
    codApp,
    codCli,
  }: RegisterSubscriptionUseCaseRequest): Promise<RegisterSubscriptionUseCaseResponse> {
    const cliente = await this.clienteRepository.findById(codCli)

    if (!cliente) {
      return left(new ResourceNotFoundError('Cliente não encontrado.'))
    }

    const aplicativo = await this.aplicativoRepository.findById(codApp)

    if (!aplicativo) {
      return left(
        new ResourceNotFoundError(
          'Aplicativo não existente em nosso banco de dados.',
        ),
      )
    }

    const subscriptionAlreadyExists =
      await this.assinaturaRepository.findByClientIdAndAppId(codCli, codApp)

    if (subscriptionAlreadyExists) {
      return left(
        new ResourceNotFoundError(
          'Assinatura já existente entre cliente e aplicativo',
        ),
      )
    }

    const assinatura = Assinatura.create({
      codApp,
      codCli,
    })
    await this.assinaturaRepository.register(assinatura)

    return right({ assinatura })
  }
}
