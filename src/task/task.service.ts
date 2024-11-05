import { PrismaService } from '@/infra/database/prisma/prisma.service'
import { Injectable, Logger, OnModuleInit } from '@nestjs/common'
import { Interval } from '@nestjs/schedule'

@Injectable()
export class TasksService implements OnModuleInit {
  constructor(private prisma: PrismaService) {}

  private readonly logger = new Logger(TasksService.name)

  @Interval(30000)
  handleInterval() {
    this.logger.debug('Verificação da validade das assinaturas realizada!!')
  }

  async onModuleInit() {
    await this.checkSubscriptions()
  }

  @Interval(30000) // a cada 30 segundos, realizar uma verificação
  async checkSubscriptions() {
    const currentDate = new Date()

    // Atualizando os valores de status de uma determinada assinatura
    await this.prisma.assinatura.updateMany({
      where: {
        fimVigencia: {
          lt: currentDate,
        },
        OR: [{ status: 'ativa' }, { status: null }],
      },
      data: {
        status: 'cancelada',
      },
    })
  }
}
