import { Aplicativo } from '@/domain/enterprise/entities/aplicativos'
import { AplicativoRepository } from '../repositories/aplicativoRepository'
import { Injectable } from '@nestjs/common'
import { Either, left, right } from '@/core/either'
import { AppNotFoundError } from '@/core/errors/errors/appNotFoundError'

// usuário vai poder editar o custo mensal

interface EditAppMonthlyCostUseCaseRequest {
  codigo: string
  custoMensal: number
}

type EditAppMonthlyCostUseCaseResponse = Either<
  AppNotFoundError,
  {
    aplicativo: Aplicativo
  }
>

@Injectable()
export class EditAppMonthlyCostUseCase {
  constructor(private aplicativoRepository: AplicativoRepository) {}

  async execute({
    codigo,
    custoMensal,
  }: EditAppMonthlyCostUseCaseRequest): Promise<EditAppMonthlyCostUseCaseResponse> {
    // Buscar o cliente e verificar se o cliente existe
    const aplicativo = await this.aplicativoRepository.findById(codigo)

    if (!aplicativo) {
      return left(new AppNotFoundError())
    }

    // Realizando a alteração dos campos
    aplicativo.custoMensal = custoMensal

    await this.aplicativoRepository.edit(aplicativo)

    return right({ aplicativo })
  }
}
