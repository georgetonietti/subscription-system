import { AplicativoRepository } from '@/domain/application/repositories/aplicativoRepository'
import { Aplicativo } from '@/domain/enterprise/entities/aplicativos'
import { ConflictException, Injectable } from '@nestjs/common'
import { PrismaAplicativoMapper } from '../mappers/prismaAplicativoMapper'
import { PrismaService } from '../prisma.service'

@Injectable()
export class PrismaAplicativoRepository implements AplicativoRepository {
  constructor(private prisma: PrismaService) {}

  async register(aplicativo: Aplicativo): Promise<Aplicativo> {
    const data = PrismaAplicativoMapper.toPrisma(aplicativo)

    const appWithSameName = await this.prisma.aplicativo.findUnique({
      where: {
        nome: aplicativo.nome,
      },
    })

    if (appWithSameName) {
      throw new ConflictException('Aplicativo já cadastrado em nosso sistema.')
    }

    const newApp = await this.prisma.aplicativo.create({
      data,
    })

    return PrismaAplicativoMapper.toDomain(newApp)
  }

  async findById(id: string): Promise<Aplicativo | null> {
    const application = await this.prisma.aplicativo.findUnique({
      where: {
        codigo: id,
      },
    })

    if (!application) {
      return null
    }

    return PrismaAplicativoMapper.toDomain(application)
  }

  async findAll(): Promise<Aplicativo[] | null> {
    const aplicativos = await this.prisma.aplicativo.findMany({
      orderBy: {
        createdAt: 'desc',
      },
    })

    return aplicativos.map((aplicativo) => {
      return PrismaAplicativoMapper.toDomain(aplicativo)
    })
  }

  async edit(aplicativo: Aplicativo): Promise<void> {
    const data = PrismaAplicativoMapper.toPrisma(aplicativo)

    await this.prisma.aplicativo.update({
      where: {
        codigo: data.codigo,
      },
      data,
    })
  }
}
