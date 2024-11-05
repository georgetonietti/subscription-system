import { Cliente } from '@/domain/enterprise/entities/cliente'
import { ClienteRepository } from '../repositories/clienteRepository'
import { Either, left, right } from '@/core/either'
import { ClientNotFoundError } from '@/core/errors/errors/clientNotFoundError'
import { Injectable } from '@nestjs/common'
import { EmailOrNameAlreadyRegisteredError } from '@/core/errors/errors/emailOrNameAlreadyRegisteredError'

// usuário vai poder editar o nome e o email

interface EditClientUseCaseRequest {
  codigo: string
  nome: string
  email: string
}

type EditClientUseCaseResponse = Either<
  ClientNotFoundError | EmailOrNameAlreadyRegisteredError,
  {
    cliente: Cliente
  }
>

@Injectable()
export class EditClientUseCase {
  constructor(private clienteRepository: ClienteRepository) {}

  async execute({
    codigo,
    nome,
    email,
  }: EditClientUseCaseRequest): Promise<EditClientUseCaseResponse> {
    // Buscar o cliente e verificar se o cliente existe
    const cliente = await this.clienteRepository.findById(codigo)

    if (!cliente) {
      return left(new ClientNotFoundError())
    }

    if (cliente.email === email || cliente.nome === nome) {
      return left(new EmailOrNameAlreadyRegisteredError())
    }

    // Realizando a alteração dos campos
    cliente.nome = nome
    cliente.email = email

    await this.clienteRepository.edit(cliente)

    return right({ cliente })
  }
}
