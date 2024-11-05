import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger'
import { ConfigService } from '@nestjs/config'
import { Env } from './env'

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {})

  const configService: ConfigService<Env, true> = app.get(ConfigService)
  const port = configService.get('PORT', { infer: true })

  const config = new DocumentBuilder()
    .setTitle('Subscription System')
    .setDescription(
      `
    Considerando mundo de hoje, o problema propõem a criação de uma aplicação que trabalha com o modelo de assinaturas.O cliente poderá baixar os aplicativos gratuitamente na loja, porém eles só devem estar disponíveis caso o cliente tenha um assinatura paga.

    Com isto, é necessário um sistema para manter o controle das assinaturas, este sistema deve ser capaz de, periodicamente, verificar se a assinatura continua válida. Ao assinar um aplicativo, o sistema deve automaticamente gerar um código, que juntamente com o código de identificação do cliente, fazem a liberação do aplicativo.
    `,
    )
    .build()

  const document = SwaggerModule.createDocument(app, config)
  SwaggerModule.setup('docs', app, document, {
    swaggerOptions: { defaultModelsExpandDepth: -1 },
  })

  await app.listen(port, () =>
    console.log(`HTTP server running on port ${port}`),
  )
}
bootstrap()
