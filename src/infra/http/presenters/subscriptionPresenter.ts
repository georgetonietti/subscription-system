import { AssinaturaDetails } from '@/domain/application/useCases/getClientSubscription'
import { Assinatura } from '@/domain/enterprise/entities/assinaturas'

export class AssinaturaPresenter {
  static toHTTP(assinatura: Assinatura) {
    return {
      codigo: assinatura.codigo.toString(),
      codApp: assinatura.codApp.toString(),
      codCli: assinatura.codCli.toString(),
      inicioVigencia: assinatura.inicioVigencia,
      fimVigencia: assinatura.fimVigencia,
      status: assinatura.getStatus,
      // subscriptionDetails: assinatura.getSubscriptionDetails,
    }
  }
}

export class CreateAssinaturaPresenter {
  static toHTTP(assinatura: Assinatura) {
    return {
      codigo: assinatura.codigo.toString(),
      codApp: assinatura.codApp.toString(),
      codCli: assinatura.codCli.toString(),
      inicioVigencia: assinatura.inicioVigencia,
      fimVigencia: assinatura.fimVigencia,
    }
  }
}

export class AssinaturaWithStatusPresenter {
  static toHTTP(assinatura: AssinaturaDetails) {
    return {
      codigo: assinatura.codigoAssinatura,
      codApp: assinatura.codigoAplicativo,
      codCli: assinatura.codigoCliente,
      inicioVigencia: assinatura.dataInicio,
      fimVigencia: assinatura.dataEncerramento,
      status: assinatura.status,
    }
  }
}
