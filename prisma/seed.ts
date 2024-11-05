import { PrismaClient } from '@prisma/client'
import { faker } from '@faker-js/faker'
import { bold } from 'kleur'

const prisma = new PrismaClient()

async function seed() {
  await prisma.assinatura.deleteMany()
  await prisma.cliente.deleteMany()
  await prisma.aplicativo.deleteMany()

  const clientes = new Array(10).fill(null).map(() =>
    prisma.cliente.create({
      data: {
        nome: faker.person.fullName(),
        email: faker.internet.email(),
      },
    }),
  )

  const aplicativos = new Array(10).fill(null).map(() =>
    prisma.aplicativo.create({
      data: {
        nome: faker.company.name(),
        custoMensal: Number(faker.finance.amount({ min: 5, max: 100 })),
      },
    }),
  )

  const [
    cliente1,
    cliente2,
    cliente3,
    cliente4,
    cliente5,
    cliente6,
    cliente7,
    cliente8,
    cliente9,
    cliente10,
  ] = await Promise.all(clientes)
  const [
    aplicativo1,
    aplicativo2,
    aplicativo3,
    aplicativo4,
    aplicativo5,
    aplicativo6,
    aplicativo7,
    aplicativo8,
    aplicativo9,
    aplicativo10,
  ] = await Promise.all(aplicativos)

  await prisma.assinatura.create({
    data: {
      codApp: aplicativo1.codigo,
      codCli: cliente1.codigo,
      fimVigencia: faker.date.future({ years: 1 }),
      status: 'ativa',
    },
  })

  await prisma.assinatura.create({
    data: {
      codApp: aplicativo2.codigo,
      codCli: cliente1.codigo,
      fimVigencia: faker.date.past({ years: 1 }),
    },
  })

  await prisma.assinatura.create({
    data: {
      codApp: aplicativo2.codigo,
      codCli: cliente2.codigo,
      fimVigencia: faker.date.future({ years: 1 }),
      status: 'ativa',
    },
  })

  await prisma.assinatura.create({
    data: {
      codApp: aplicativo3.codigo,
      codCli: cliente3.codigo,
      fimVigencia: faker.date.past({ years: 1 }),
    },
  })

  await prisma.assinatura.create({
    data: {
      codApp: aplicativo2.codigo,
      codCli: cliente4.codigo,
      fimVigencia: faker.date.future({ years: 1 }),
      status: 'ativa',
    },
  })

  await prisma.assinatura.create({
    data: {
      codApp: aplicativo7.codigo,
      codCli: cliente6.codigo,
      fimVigencia: faker.date.future({ years: 1 }),
      status: 'ativa',
    },
  })

  await prisma.assinatura.create({
    data: {
      codApp: aplicativo9.codigo,
      codCli: cliente1.codigo,
      fimVigencia: faker.date.future({ years: 1 }),
      status: 'ativa',
    },
  })

  await prisma.assinatura.create({
    data: {
      codApp: aplicativo2.codigo,
      codCli: cliente10.codigo,
      fimVigencia: faker.date.future({ years: 1 }),
      status: 'ativa',
    },
  })

  await prisma.assinatura.create({
    data: {
      codApp: aplicativo8.codigo,
      codCli: cliente3.codigo,
      fimVigencia: faker.date.future({ years: 1 }),
      status: 'ativa',
    },
  })

  await prisma.assinatura.create({
    data: {
      codApp: aplicativo10.codigo,
      codCli: cliente5.codigo,
      fimVigencia: faker.date.future({ years: 1 }),
      status: 'ativa',
    },
  })

  await prisma.assinatura.create({
    data: {
      codApp: aplicativo10.codigo,
      codCli: cliente7.codigo,
      fimVigencia: faker.date.future({ years: 1 }),
      status: 'ativa',
    },
  })

  await prisma.assinatura.create({
    data: {
      codApp: aplicativo10.codigo,
      codCli: cliente8.codigo,
      fimVigencia: faker.date.future({ years: 1 }),
      status: 'ativa',
    },
  })

  await prisma.assinatura.create({
    data: {
      codApp: aplicativo6.codigo,
      codCli: cliente9.codigo,
      fimVigencia: faker.date.future({ years: 1 }),
      status: 'ativa',
    },
  })

  await prisma.assinatura.create({
    data: {
      codApp: aplicativo5.codigo,
      codCli: cliente1.codigo,
      fimVigencia: faker.date.future({ years: 1 }),
      status: 'ativa',
    },
  })

  await prisma.assinatura.create({
    data: {
      codApp: aplicativo4.codigo,
      codCli: cliente10.codigo,
      fimVigencia: faker.date.future({ years: 1 }),
      status: 'ativa',
    },
  })

  await prisma.assinatura.create({
    data: {
      codApp: aplicativo7.codigo,
      codCli: cliente1.codigo,
      fimVigencia: faker.date.past({ years: 1 }),
    },
  })

  await prisma.assinatura.create({
    data: {
      codApp: aplicativo3.codigo,
      codCli: cliente8.codigo,
      fimVigencia: faker.date.past({ years: 1 }),
    },
  })

  await prisma.assinatura.create({
    data: {
      codApp: aplicativo5.codigo,
      codCli: cliente6.codigo,
      fimVigencia: faker.date.past({ years: 1 }),
    },
  })

  await prisma.assinatura.create({
    data: {
      codApp: aplicativo6.codigo,
      codCli: cliente6.codigo,
      fimVigencia: faker.date.past({ years: 1 }),
    },
  })

  await prisma.assinatura.create({
    data: {
      codApp: aplicativo8.codigo,
      codCli: cliente2.codigo,
      fimVigencia: faker.date.past({ years: 1 }),
    },
  })

  await prisma.assinatura.create({
    data: {
      codApp: aplicativo8.codigo,
      codCli: cliente1.codigo,
      fimVigencia: faker.date.past({ years: 1 }),
    },
  })

  for (let i = 0; i < 5; i++) {
    await prisma.cliente.create({
      data: {
        nome: faker.person.fullName(),
        email: faker.internet.email(),
      },
    })
  }

  for (let i = 0; i < 5; i++) {
    await prisma.aplicativo.create({
      data: {
        nome: faker.company.name(),
        custoMensal: Number(faker.finance.amount({ min: 5, max: 100 })),
      },
    })
  }
}

seed().then(() => {
  console.log(bold().green('✅ Database seeded'))
})
