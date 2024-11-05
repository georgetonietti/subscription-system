import { Injectable } from '@nestjs/common'
import { AplicativoRepository } from '../repositories/aplicativoRepository'
import { Aplicativo } from '@/domain/enterprise/entities/aplicativos'
import { Either, right } from '@/core/either'

type ListAllAppsUseCaseResponse = Either<
  null,
  {
    aplicativos: Aplicativo[]
  }
>

@Injectable()
export class ListAllAppsUseCase {
  constructor(private aplicativoRepository: AplicativoRepository) {}

  async execute(): Promise<ListAllAppsUseCaseResponse> {
    const aplicativos = await this.aplicativoRepository.findAll()

    if (!aplicativos) {
      throw new Error()
    }

    return right({ aplicativos })
  }
}
