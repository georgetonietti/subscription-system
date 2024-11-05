import { UniqueEntityCodigo } from './uniqueEntityCodigo'

export class Entity<Props> {
  private _codigo: UniqueEntityCodigo
  // propriedade única para manter referência de todos os campos da entidade
  protected props: Props

  get codigo() {
    return this._codigo
  }

  protected constructor(props: Props, codigo?: UniqueEntityCodigo) {
    this.props = props
    this._codigo = codigo ?? new UniqueEntityCodigo()
  }
}
