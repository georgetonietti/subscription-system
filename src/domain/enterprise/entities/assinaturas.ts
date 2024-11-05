import dayjs from 'dayjs'
import { Entity } from '@/core/entities/entity'
import { UniqueEntityCodigo } from '@/core/entities/uniqueEntityCodigo'
import { Optional } from '@/core/types/optional'
import { createsSubscriptionValidity } from '@/utils/createsSubscriptionValidity'
import { AssinaturaDetails } from '@/domain/application/useCases/getClientSubscription'

export interface AssinaturaProps {
  inicioVigencia: Date
  fimVigencia: Date
  codApp: string
  codCli: string
  status?: string
}

export type AssinaturaDetailsWithStatus = AssinaturaDetails & {
  status: 'ATIVA' | 'CANCELADA'
}

export class Assinatura extends Entity<AssinaturaProps> {
  get inicioVigencia() {
    return this.props.inicioVigencia
  }

  get fimVigencia() {
    return this.props.fimVigencia
  }

  get codApp() {
    return this.props.codApp
  }

  get codCli() {
    return this.props.codCli
  }

  get status() {
    return this.props.status
  }

  get isSubscriptionExpired(): boolean {
    return dayjs().isAfter(this.fimVigencia, 'day')
  }

  getSubscriptionDetails(): AssinaturaDetailsWithStatus {
    const baseDetails: AssinaturaDetails = {
      codigoAssinatura: this.codigo.toValue(),
      codigoCliente: this.props.codCli,
      codigoAplicativo: this.props.codApp,
      dataInicio: this.props.inicioVigencia,
      dataEncerramento: this.props.fimVigencia,
      status: '', // Adicionando a propriedade status com um valor vazio temporário
    }

    // Obtendo o status real
    const status: 'ATIVA' | 'CANCELADA' =
      this.getStatus('TODAS') === 'ativa' ? 'ATIVA' : 'CANCELADA'

    // Atualizando o valor de status em baseDetails
    baseDetails.status = status

    // Retornando os detalhes da assinatura com status
    return baseDetails as AssinaturaDetailsWithStatus
  }

  getStatus(tipo: 'TODAS' | 'ATIVAS' | 'CANCELADAS'): 'ativa' | 'cancelada' {
    const dataAtual = new Date()
    const fimVigencia = new Date(this.props.fimVigencia)

    if (tipo === 'TODAS') {
      if (dataAtual > fimVigencia) {
        return 'cancelada'
      } else {
        return 'ativa'
      }
    } else if (tipo === 'ATIVAS') {
      if (dataAtual < fimVigencia) {
        return 'ativa'
      } else {
        return 'cancelada'
      }
    } else if (tipo === 'CANCELADAS') {
      if (dataAtual > fimVigencia) {
        return 'cancelada'
      } else {
        return 'ativa'
      }
    } else {
      throw new Error('Tipo informado não existe')
    }
  }

  // método static não precisa ser instanciado
  static create(
    props: Optional<AssinaturaProps, 'inicioVigencia' | 'fimVigencia'>,
    codigo?: UniqueEntityCodigo,
  ) {
    const assinatura = new Assinatura(
      {
        ...props,
        inicioVigencia: new Date(),
        fimVigencia: createsSubscriptionValidity(),
      },
      codigo,
    )

    return assinatura
  }
}
