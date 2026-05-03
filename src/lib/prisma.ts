import {PrismaClient} from '@prisma/client'

let prisma: PrismaClient

if (process.env.NODE_ENV === 'production') {
  console.log('PRISMA: Production mode')
  console.log('PRISMA: DATABASE_URL set?', !!process.env.DATABASE_URL)
  prisma = new PrismaClient()
} else {
  console.log('PRISMA: Development mode')
  console.log('PRISMA: DATABASE_URL set?', !!process.env.DATABASE_URL)
  // Avoid instantiating multiple PrismaClient instances in development
  if (!(global as any).prisma) {
    ;(global as any).prisma = new PrismaClient({
      log: ['warn', 'error'],
    })
  }
  prisma = (global as any).prisma
}

export default prisma
