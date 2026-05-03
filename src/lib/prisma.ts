import {PrismaClient} from '@prisma/client'

let prisma: PrismaClient

try {
  if (process.env.NODE_ENV === 'production') {
    console.log('PRISMA: Production mode')
    console.log('PRISMA: DATABASE_URL set?', !!process.env.DATABASE_URL)
    if (!process.env.DATABASE_URL) {
      throw new Error('DATABASE_URL environment variable is not set!')
    }
    prisma = new PrismaClient()
  } else {
    console.log('PRISMA: Development mode')
    console.log('PRISMA: DATABASE_URL set?', !!process.env.DATABASE_URL)
    // Avoid instantiating multiple PrismaClient instances in development
    if (!(global as any).prisma) {
      if (!process.env.DATABASE_URL) {
        throw new Error('DATABASE_URL environment variable is not set!')
      }
      ;(global as any).prisma = new PrismaClient({
        log: ['warn', 'error'],
      })
    }
    prisma = (global as any).prisma
  }
} catch (error) {
  console.error('PRISMA INIT ERROR:', error)
  throw error
}

export default prisma
