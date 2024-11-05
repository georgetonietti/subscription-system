import { ClienteRepository } from '@/domain/application/repositories/clienteRepository'
import { ConflictException, Injectable } from '@nestjs/common'
import { PrismaService } from '../prisma.service'
import { Cliente } from '@/domain/enterprise/entities/cliente'
import { PrismaClienteMapper } from '../mappers/prismaClienteMapper'

@Injectable()
export class PrismaClienteRepository implements ClienteRepository {
  constructor(private prisma: PrismaService) {}

  async register(cliente: Cliente): Promise<Cliente> {
    const data = PrismaClienteMapper.toPrisma(cliente)

    // Verificando se o email cadastrado já está no cadastrado no banco de dados
    const clientWithSameEmail = await this.prisma.cliente.findUnique({
      where: {
        email: cliente.email,
      },
    })

    if (clientWithSameEmail) {
      throw new ConflictException('Cliente já cadastrado em nosso sistema.')
    }

    // Caso esteja tudo correto com os dados de entrada, validar a criação
    const registeredCliente = await this.prisma.cliente.create({
      data,
    })

    return PrismaClienteMapper.toDomain(registeredCliente)
  }

  async findById(id: string): Promise<Cliente | null> {
    const cliente = await this.prisma.cliente.findUnique({
      where: {
        codigo: id,
      },
    })

    if (!cliente) {
      return null
    }

    return PrismaClienteMapper.toDomain(cliente)
  }

  async findByEmail(email: string): Promise<Cliente | null> {
    const cliente = await this.prisma.cliente.findUnique({
      where: {
        email,
      },
    })

    if (!cliente) {
      return null
    }

    return PrismaClienteMapper.toDomain(cliente)
  }

  async findAll(): Promise<Cliente[]> {
    const clientes = await this.prisma.cliente.findMany({
      orderBy: {
        createdAt: 'desc',
      },
    })

    return clientes.map((cliente) => {
      return PrismaClienteMapper.toDomain(cliente)
    })
  }

  async edit(cliente: Cliente): Promise<void> {
    const data = PrismaClienteMapper.toPrisma(cliente)

    await this.prisma.cliente.update({
      where: {
        codigo: data.codigo,
      },
      data,
    })
  }
}
