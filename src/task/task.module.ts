import { Module } from '@nestjs/common'
import { TasksService } from './task.service'
import { DatabaseModule } from '@/infra/database/database.module'

@Module({
  imports: [DatabaseModule],
  providers: [TasksService],
})
export class TasksModule {}
