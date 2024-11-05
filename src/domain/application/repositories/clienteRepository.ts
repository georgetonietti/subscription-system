import { Cliente } from '@/domain/enterprise/entities/cliente'

export abstract class ClienteRepository {
  abstract register(cliente: Cliente): Promise<Cliente>
  abstract findById(id: string): Promise<Cliente | null>
  abstract findAll(): Promise<Cliente[]>
  abstract edit(cliente: Cliente): Promise<void>
  abstract findByEmail(email: string): Promise<Cliente | null>
}
