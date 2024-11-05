import { AssinaturaRepository } from '@/domain/application/repositories/assinaturaRepository'
import { AssinaturaDetails } from '@/domain/application/useCases/getClientSubscription'
import { Assinatura } from '@/domain/enterprise/entities/assinaturas'
import { Injectable } from '@nestjs/common'
import {
  PrismaAssinaturaDetailsMapper,
  PrismaAssinaturaMapper,
} from '../mappers/prismaAssinaturaMapper'
import { PrismaService } from '../prisma.service'

@Injectable()
export class PrismaAssinaturaRepository implements AssinaturaRepository {
  constructor(private prisma: PrismaService) {}

  async register(assinatura: Assinatura): Promise<Assinatura> {
    const data = PrismaAssinaturaMapper.toPrisma(assinatura)

    // Caso esteja tudo correto com os dados de entrada, validar a criação
    const registeredSubscription = await this.prisma.assinatura.create({
      data,
    })

    return PrismaAssinaturaMapper.toDomain(registeredSubscription)
  }

  async findAll(
    tipo?: 'TODAS' | 'ATIVAS' | 'CANCELADAS',
  ): Promise<AssinaturaDetails[] | null> {
    let assinaturas

    if (tipo === 'ATIVAS') {
      assinaturas = await this.prisma.assinatura.findMany({
        where: {
          status: 'ativa',
        },
      })
    } else if (tipo === 'CANCELADAS') {
      assinaturas = await this.prisma.assinatura.findMany({
        where: {
          status: 'cancelada',
        },
      })
    } else {
      assinaturas = await this.prisma.assinatura.findMany()
    }

    if (!assinaturas || assinaturas.length === 0) {
      return null
    }

    // Mapear as assinaturas para AssinaturaDetails
    const assinaturasDetails: AssinaturaDetails[] = assinaturas.map(
      (assinatura) => ({
        codigoAssinatura: assinatura.codigo,
        codigoCliente: assinatura.codCli,
        codigoAplicativo: assinatura.codApp,
        dataInicio: assinatura.inicioVigencia,
        dataEncerramento: assinatura.fimVigencia,
        status: assinatura.status || '',
      }),
    )

    return assinaturasDetails
  }

  async listByClient(id: string): Promise<AssinaturaDetails[]> {
    const clientDetails = await this.prisma.cliente.findMany({
      where: { codigo: id },
      select: {
        assinaturas: {
          select: {
            codigo: true,
            codApp: true,
            codCli: true,
            inicioVigencia: true,
            fimVigencia: true,
            status: true,
          },
        },
      },
    })

    if (!clientDetails?.length) return []

    const assinaturas: AssinaturaDetails[] = clientDetails.flatMap((client) =>
      client.assinaturas.map((assinatura) =>
        PrismaAssinaturaDetailsMapper.toDomain(assinatura),
      ),
    )

    return assinaturas
  }

  async listByApp(id: string): Promise<AssinaturaDetails[]> {
    const appDetails = await this.prisma.aplicativo.findMany({
      where: { codigo: id },
      select: {
        assinaturas: {
          select: {
            codigo: true,
            codApp: true,
            codCli: true,
            inicioVigencia: true,
            fimVigencia: true,
            status: true,
          },
        },
      },
    })

    if (!appDetails?.length) return []

    const assinaturas: AssinaturaDetails[] = appDetails.flatMap((app) =>
      app.assinaturas.map((assinatura) =>
        PrismaAssinaturaDetailsMapper.toDomain(assinatura),
      ),
    )

    return assinaturas
  }

  async findByClientIdAndAppId(
    clientId: string,
    appId: string,
  ): Promise<Assinatura | null> {
    const assinatura = await this.prisma.assinatura.findFirst({
      where: {
        codCli: clientId,
        codApp: appId,
      },
    })

    if (!assinatura) {
      return null
    }

    return PrismaAssinaturaMapper.toDomain(assinatura)
  }

  async findById(id: string): Promise<string | null> {
    const assinatura = await this.prisma.assinatura.findUnique({
      where: {
        codigo: id,
      },
      select: {
        status: true,
      },
    })

    if (!assinatura) {
      return null
    }

    return assinatura.status
  }
}
