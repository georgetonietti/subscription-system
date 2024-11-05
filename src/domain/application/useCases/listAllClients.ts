import { Injectable } from '@nestjs/common'
import { ClienteRepository } from '../repositories/clienteRepository'
import { Either, right } from '@/core/either'
import { Cliente } from '@/domain/enterprise/entities/cliente'

type ListAllClientsUseCaseResponse = Either<
  null,
  {
    clientes: Cliente[]
  }
>

@Injectable()
export class ListAllClientsUseCase {
  constructor(private clienteRepository: ClienteRepository) {}

  async execute(): Promise<ListAllClientsUseCaseResponse> {
    const clientes = await this.clienteRepository.findAll()

    if (!clientes) {
      throw new Error()
    }

    return right({ clientes })
  }
}
