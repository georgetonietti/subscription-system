import { AppNotFoundError } from '@/core/errors/errors/appNotFoundError'
import { AplicativoRepository } from '../repositories/aplicativoRepository'
import { Either, left, right } from '@/core/either'
import { Injectable } from '@nestjs/common'
import { Aplicativo } from '@/domain/enterprise/entities/aplicativos'

interface GetApplicationDetailByIdCaseRequest {
  codigo: string
}

type GetApplicationDetailByIdCaseResponse = Either<
  AppNotFoundError,
  {
    aplicativo: Aplicativo
  }
>

@Injectable()
export class GetApplicationDetailByIdCase {
  constructor(private aplicativoRepository: AplicativoRepository) {}

  async execute({
    codigo,
  }: GetApplicationDetailByIdCaseRequest): Promise<GetApplicationDetailByIdCaseResponse> {
    const aplicativo = await this.aplicativoRepository.findById(codigo)

    if (!aplicativo) {
      return left(new AppNotFoundError())
    }

    return right({ aplicativo })
  }
}
