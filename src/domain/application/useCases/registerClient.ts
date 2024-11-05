import { Cliente } from '@/domain/enterprise/entities/cliente'
import { ClienteRepository } from '../repositories/clienteRepository'
import { Injectable } from '@nestjs/common'
import { Either, left, right } from '@/core/either'
import { UserAlreadyExistsError } from '@/core/errors/errors/userAlreadyExistsError'

interface RegisterClientUseCaseRequest {
  nome: string
  email: string
}

type RegisterClientUseCaseResponse = Either<
  UserAlreadyExistsError,
  {
    cliente: Cliente
  }
>

@Injectable()
export class RegisterClientUseCase {
  constructor(private clienteRepository: ClienteRepository) {}

  async execute({
    email,
    nome,
  }: RegisterClientUseCaseRequest): Promise<RegisterClientUseCaseResponse> {
    const newCliente = Cliente.create({ nome, email })

    const userAlreadyExists = await this.clienteRepository.findByEmail(email)

    if (userAlreadyExists) {
      return left(new UserAlreadyExistsError())
    }

    const cliente = await this.clienteRepository.register(newCliente)

    return right({ cliente })
  }
}
