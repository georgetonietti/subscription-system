import { Entity } from '@/core/entities/entity'
import { UniqueEntityCodigo } from '@/core/entities/uniqueEntityCodigo'
import { Optional } from '@/core/types/optional'

export interface AplicativoProps {
  nome: string
  custoMensal: number
  createdAt: Date
  updatedAt?: Date | null
  // assinaturas: Assinatura[]
}

export class Aplicativo extends Entity<AplicativoProps> {
  // Getters e Setters

  get nome() {
    return this.props.nome
  }

  get custoMensal() {
    return this.props.custoMensal
  }

  get createdAt() {
    return this.props.createdAt
  }

  get updatedAt() {
    return this.props.updatedAt
  }

  private touch() {
    this.props.updatedAt = new Date()
  }

  set custoMensal(custoMensal: number) {
    this.props.custoMensal = custoMensal
    this.touch()
  }

  static create(
    props: Optional<AplicativoProps, 'createdAt'>,
    codigo?: UniqueEntityCodigo,
  ) {
    const aplicativo = new Aplicativo(
      { ...props, createdAt: new Date() },
      codigo,
    )

    return aplicativo
  }
}
