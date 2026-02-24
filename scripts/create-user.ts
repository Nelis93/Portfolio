import prisma from '../src/lib/prisma'
import {hashPassword} from '../src/utils/auth'

async function createUser(username: string, password: string) {
  try {
    const hashedPassword = await hashPassword(password)
    const user = await prisma.user.create({
      data: {
        username,
        password: hashedPassword,
      },
    })
    console.log('✅ User created successfully:', {
      id: user.id,
      username: user.username,
      createdAt: user.createdAt,
    })
    return user
  } catch (error: any) {
    if (error.code === 'P2002') {
      console.error('❌ Error: Username already exists')
    } else {
      console.error('❌ Error creating user:', error.message)
    }
    throw error
  }
}

async function main() {
  const username = process.argv[2]
  const password = process.argv[3]

  if (!username || !password) {
    console.log('Usage: ts-node scripts/create-user.ts <username> <password>')
    console.log('Example: ts-node scripts/create-user.ts AdminIsMe mySecurePassword123')
    process.exit(1)
  }

  await createUser(username, password)
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
