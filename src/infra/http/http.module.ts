import { Module } from '@nestjs/common'
import { GetApplicationDetailByIdController } from './controllers/aplicativos/getApplicationDetail.controller'
import { ListAllAppsController } from './controllers/aplicativos/listAllApps.controller'
import { RegisterApllicationController } from './controllers/aplicativos/registerApplication.controller'
import { UpdateMonthlyCostApplicationControlller } from './controllers/aplicativos/updateMonthlyCostApplication.controller'
import { GetApplicationSubscriptionController } from './controllers/assinaturas/getApplicationSubscription.controller'
import { GetClientSubscriptionController } from './controllers/assinaturas/getClientSubscription.controller'
import { ListAllCurrentSubscriptionsController } from './controllers/assinaturas/listAllCurrentSubscriptions.controller'
import { RegisterSubscriptionController } from './controllers/assinaturas/registerSubscription.controller'
import { EditClientController } from './controllers/clientes/editClient.controller'
import { GetClientByIdController } from './controllers/clientes/getClientById.controller'
import { ListAllClientsController } from './controllers/clientes/listAllClients.controller'
import { RegisterClientController } from './controllers/clientes/registerClient.controller'
import { DatabaseModule } from '../database/database.module'
import { RegisterClientUseCase } from '@/domain/application/useCases/registerClient'
import { ListAllClientsUseCase } from '@/domain/application/useCases/listAllClients'
import { GetClientByIdUseCase } from '@/domain/application/useCases/getClientById'
import { EditClientUseCase } from '@/domain/application/useCases/editClient'
import { RegisterApplicationUseCase } from '@/domain/application/useCases/registerApplication'
import { GetApplicationDetailByIdCase } from '@/domain/application/useCases/getApplicationDetailById'
import { ListAllAppsUseCase } from '@/domain/application/useCases/listAllApps'
import { EditAppMonthlyCostUseCase } from '@/domain/application/useCases/editAppMonthlyCost'
import { RegisterSubscriptionUseCase } from '@/domain/application/useCases/registerSubscription'
import { ListAllSubscriptionUseCase } from '@/domain/application/useCases/listAllSubscription'
import { GetClientSubscriptionUseCase } from '@/domain/application/useCases/getClientSubscription'
import { GetApplicationSubscriptionUseCase } from '@/domain/application/useCases/getApplicationSubscription'
import { GetSubscriptionByIdUseCase } from '@/domain/application/useCases/getSubscriptionById'
import { GetSubscriptionByIdController } from './controllers/assinaturas/getSubscriptionById.controller'

@Module({
  imports: [DatabaseModule],
  controllers: [
    RegisterClientController,
    RegisterApllicationController,
    RegisterSubscriptionController,
    ListAllClientsController,
    ListAllAppsController,
    ListAllCurrentSubscriptionsController,
    GetClientByIdController,
    GetApplicationDetailByIdController,
    UpdateMonthlyCostApplicationControlller,
    GetClientSubscriptionController,
    GetApplicationSubscriptionController,
    EditClientController,
    GetSubscriptionByIdController,
  ],
  providers: [
    RegisterClientUseCase,
    ListAllClientsUseCase,
    GetClientByIdUseCase,
    EditClientUseCase,
    RegisterApplicationUseCase,
    GetApplicationDetailByIdCase,
    ListAllAppsUseCase,
    EditAppMonthlyCostUseCase,
    RegisterSubscriptionUseCase,
    ListAllSubscriptionUseCase,
    GetClientSubscriptionUseCase,
    GetApplicationSubscriptionUseCase,
    GetSubscriptionByIdUseCase,
  ],
})
export class HttpModule {}
