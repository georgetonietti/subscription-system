import { UniqueEntityCodigo } from '@/core/entities/uniqueEntityCodigo'
import { AssinaturaDetails } from '@/domain/application/useCases/getClientSubscription'
import { Assinatura } from '@/domain/enterprise/entities/assinaturas'
import { Prisma, Assinatura as PrismaAssinatura } from '@prisma/client'

export class PrismaAssinaturaMapper {
  static toDomain(raw: PrismaAssinatura): Assinatura {
    return Assinatura.create(
      {
        codApp: raw.codApp,
        codCli: raw.codCli,
        inicioVigencia: raw.inicioVigencia,
        fimVigencia: raw.fimVigencia,
      },
      new UniqueEntityCodigo(raw.codigo),
    )
  }

  static toPrisma(
    assinatura: Assinatura,
  ): Prisma.AssinaturaUncheckedCreateInput {
    return {
      codigo: assinatura.codigo.toString(),
      codApp: assinatura.codApp.toString(),
      codCli: assinatura.codCli.toString(),
      inicioVigencia: assinatura.inicioVigencia,
      fimVigencia: assinatura.fimVigencia,
    }
  }
}

export class PrismaAssinaturaDetailsMapper {
  static toDomain(assinatura: {
    inicioVigencia: Date
    fimVigencia: Date
    codApp: string
    codCli: string
    status: string | null
    codigo: string
  }): AssinaturaDetails {
    return {
      codigoAssinatura: assinatura.codigo,
      codigoCliente: assinatura.codCli,
      codigoAplicativo: assinatura.codApp,
      dataInicio: assinatura.inicioVigencia,
      dataEncerramento: assinatura.fimVigencia,
      status: assinatura.status || '',
    }
  }

  static toPrisma(
    assinatura: Assinatura,
  ): Prisma.AssinaturaUncheckedCreateInput {
    return {
      codigo: assinatura.codigo.toString(),
      codApp: assinatura.codApp.toString(),
      codCli: assinatura.codCli.toString(),
      inicioVigencia: assinatura.inicioVigencia,
      fimVigencia: assinatura.fimVigencia,
    }
  }
}
