import { Aplicativo } from '@/domain/enterprise/entities/aplicativos'
import { AplicativoRepository } from '../repositories/aplicativoRepository'
import { Injectable } from '@nestjs/common'
import { Either, right } from '@/core/either'

interface RegisterApplicationUseCaseRequest {
  nome: string
  custoMensal: number
}

type RegisterApplicationUseCaseResponse = Either<
  null,
  {
    aplicativo: Aplicativo
  }
>

@Injectable()
export class RegisterApplicationUseCase {
  constructor(private aplicativoRepository: AplicativoRepository) {}

  async execute({
    nome,
    custoMensal,
  }: RegisterApplicationUseCaseRequest): Promise<RegisterApplicationUseCaseResponse> {
    const newApp = Aplicativo.create({
      nome,
      custoMensal,
    })

    const aplicativo = await this.aplicativoRepository.register(newApp)

    return right({ aplicativo })
  }
}
