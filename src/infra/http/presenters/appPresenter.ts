import { Aplicativo } from '@/domain/enterprise/entities/aplicativos'

export class AppPresenter {
  static toHTTP(aplicativo: Aplicativo) {
    return {
      codigo: aplicativo.codigo.toString(),
      nome: aplicativo.nome,
      custoMensal: aplicativo.custoMensal,
      createdAt: aplicativo.createdAt,
    }
  }
}

export class CreateAppPresenter {
  static toHTTP(aplicativo: Aplicativo) {
    return {
      codigo: aplicativo.codigo.toString(),
      nome: aplicativo.nome,
      custoMensal: aplicativo.custoMensal,
      updatedAt: aplicativo.updatedAt,
    }
  }
}
