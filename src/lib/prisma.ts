import {PrismaClient} from '@prisma/client'

let prisma: PrismaClient

if (process.env.NODE_ENV === 'production') {
  prisma = new PrismaClient()
} else {
  // Avoid instantiating multiple PrismaClient instances in development
  if (!(global as any).prisma) {
    ;(global as any).prisma = new PrismaClient({
      log: ['warn', 'error'],
    })
  }
  prisma = (global as any).prisma
}

export default prisma
