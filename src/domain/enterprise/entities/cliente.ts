import { Entity } from '@/core/entities/entity'
import { UniqueEntityCodigo } from '@/core/entities/uniqueEntityCodigo'
import { Optional } from '@/core/types/optional'
import { validateEmail } from '@/utils/validateEmailRegex'

export interface ClientProps {
  nome: string
  email: string
  createdAt: Date
  updatedAt?: Date | null
  // assinaturas: Assinatura[]
}

export class Cliente extends Entity<ClientProps> {
  get nome() {
    return this.props.nome
  }

  get email() {
    return this.props.email
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

  set nome(nome: string) {
    this.props.nome = nome
    this.touch()
  }

  set email(email: string) {
    // Se o usuário tentar passar o mesmo email já registrado
    if (this.email === email) {
      throw new Error('Este email já está em uso')
    }

    // Verificando se o usuário está passando um email válido, utilizando expressão regular para validar
    if (!validateEmail(email)) {
      throw new Error('Email inválido')
    }

    this.props.email = email
    this.touch()
  }

  static create(
    props: Optional<ClientProps, 'createdAt'>,
    codigo?: UniqueEntityCodigo,
  ) {
    const cliente = new Cliente({ ...props, createdAt: new Date() }, codigo)

    return cliente
  }
}
