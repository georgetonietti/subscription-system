import { Aplicativo } from '@/domain/enterprise/entities/aplicativos'

export abstract class AplicativoRepository {
  abstract register(aplicativo: Aplicativo): Promise<Aplicativo>
  abstract findById(id: string): Promise<Aplicativo | null>
  abstract findAll(): Promise<Aplicativo[] | null>
  abstract edit(aplicativo: Aplicativo): Promise<void>
}
