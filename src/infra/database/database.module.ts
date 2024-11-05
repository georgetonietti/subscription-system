import { Module } from '@nestjs/common'
import { PrismaService } from './prisma/prisma.service'
import { PrismaAplicativoRepository } from './prisma/repositories/prismaAplicativoRepository'
import { PrismaAssinaturaRepository } from './prisma/repositories/prismaAssinaturaRepository'
import { PrismaClienteRepository } from './prisma/repositories/prismaClienteRepository'
import { ClienteRepository } from '@/domain/application/repositories/clienteRepository'
import { AplicativoRepository } from '@/domain/application/repositories/aplicativoRepository'
import { AssinaturaRepository } from '@/domain/application/repositories/assinaturaRepository'

@Module({
  providers: [
    PrismaService,
    {
      provide: ClienteRepository,
      useClass: PrismaClienteRepository,
    },
    {
      provide: AplicativoRepository,
      useClass: PrismaAplicativoRepository,
    },
    {
      provide: AssinaturaRepository,
      useClass: PrismaAssinaturaRepository,
    },
    PrismaAplicativoRepository,
    PrismaAssinaturaRepository,
    PrismaClienteRepository,
  ],
  exports: [
    PrismaService,
    PrismaAplicativoRepository,
    PrismaAssinaturaRepository,
    ClienteRepository,
    AplicativoRepository,
    AssinaturaRepository,
  ],
})
export class DatabaseModule {}
