import { UniqueEntityCodigo } from '@/core/entities/uniqueEntityCodigo'
import { Cliente } from '@/domain/enterprise/entities/cliente'
import { Prisma, Cliente as PrismaCliente } from '@prisma/client'

export class PrismaClienteMapper {
  static toDomain(raw: PrismaCliente): Cliente {
    return Cliente.create(
      {
        nome: raw.nome,
        email: raw.email,
        createdAt: raw.createdAt,
        updatedAt: raw.updatedAt,
      },
      new UniqueEntityCodigo(raw.codigo),
    )
  }

  static toPrisma(cliente: Cliente): Prisma.ClienteUncheckedCreateInput {
    return {
      codigo: cliente.codigo.toString(),
      nome: cliente.nome,
      email: cliente.email,
      createdAt: cliente.createdAt,
      updatedAt: cliente.updatedAt,
    }
  }
}
