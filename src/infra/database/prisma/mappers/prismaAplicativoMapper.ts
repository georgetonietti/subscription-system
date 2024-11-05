import { UniqueEntityCodigo } from '@/core/entities/uniqueEntityCodigo'
import { Aplicativo } from '@/domain/enterprise/entities/aplicativos'
import { Prisma, Aplicativo as PrismaAplicativo } from '@prisma/client'

export class PrismaAplicativoMapper {
  static toDomain(raw: PrismaAplicativo): Aplicativo {
    return Aplicativo.create(
      {
        nome: raw.nome,
        custoMensal: raw.custoMensal,
        createdAt: raw.createdAt,
        updatedAt: raw.updatedAt,
      },
      new UniqueEntityCodigo(raw.codigo),
    )
  }

  static toPrisma(
    aplicativo: Aplicativo,
  ): Prisma.AplicativoUncheckedCreateInput {
    return {
      codigo: aplicativo.codigo.toString(),
      nome: aplicativo.nome,
      custoMensal: aplicativo.custoMensal,
      createdAt: aplicativo.createdAt,
      updatedAt: aplicativo.updatedAt,
    }
  }
}
