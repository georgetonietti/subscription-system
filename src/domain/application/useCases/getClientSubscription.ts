import { ClienteRepository } from '../repositories/clienteRepository'
import { AssinaturaRepository } from '../repositories/assinaturaRepository'
import { Injectable } from '@nestjs/common'
import { Either, left, right } from '@/core/either'
import { ClientNotFoundError } from '@/core/errors/errors/clientNotFoundError'

export interface AssinaturaDetails {
  codigoAssinatura: string
  codigoCliente: string
  codigoAplicativo: string
  dataInicio: Date
  dataEncerramento: Date
  status: string
}

interface GetClientSubscriptionUseCaseRequest {
  codigoCliente: string
}

type GetClientSubscriptionUseCaseResponse = Either<
  ClientNotFoundError,
  {
    assinaturas: AssinaturaDetails[]
  }
>

@Injectable()
export class GetClientSubscriptionUseCase {
  constructor(
    private clienteRepository: ClienteRepository,
    private assinaturaRepository: AssinaturaRepository,
  ) {}

  async execute({
    codigoCliente,
  }: GetClientSubscriptionUseCaseRequest): Promise<GetClientSubscriptionUseCaseResponse> {
    const cliente = await this.clienteRepository.findById(codigoCliente)

    if (!cliente) {
      return left(new ClientNotFoundError())
    }

    const assinaturas =
      await this.assinaturaRepository.listByClient(codigoCliente)

    const assinaturasComStatus: AssinaturaDetails[] = assinaturas.map(
      (assinatura) => ({
        codigoAssinatura: assinatura.codigoAssinatura,
        codigoCliente: assinatura.codigoCliente,
        codigoAplicativo: assinatura.codigoAplicativo,
        dataInicio: assinatura.dataInicio,
        dataEncerramento: assinatura.dataEncerramento,
        status: assinatura.status,
      }),
    )

    return right({ assinaturas: assinaturasComStatus })
  }
}
