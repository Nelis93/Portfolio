import bcrypt from 'bcryptjs'
import prisma from '../lib/prisma'

/**
 * Hash a password using bcryptjs
 */
export const hashPassword = async (password: string): Promise<string> => {
  const salt = await bcrypt.genSalt(10)
  return bcrypt.hash(password, salt)
}

/**
 * Compare a password with a hashed password
 */
export const verifyPassword = async (
  password: string,
  hashedPassword: string,
): Promise<boolean> => {
  return bcrypt.compare(password, hashedPassword)
}

/**
 * Authenticate user by username and password
 */
export const authenticateUser = async (username: string, password: string): Promise<boolean> => {
  try {
    const user = await prisma.user.findUnique({
      where: {username},
    })

    if (!user) {
      return false
    }

    return await verifyPassword(password, user.password)
  } catch (error) {
    console.error('Authentication error:', error)
    return false
  }
}

/**
 * Create a new user
 */
export const createUser = async (username: string, password: string) => {
  try {
    const hashedPassword = await hashPassword(password)
    return await prisma.user.create({
      data: {
        username,
        password: hashedPassword,
      },
    })
  } catch (error) {
    console.error('Error creating user:', error)
    throw error
  }
}

/**
 * Get user by username (without password)
 */
export const getUserByUsername = async (username: string) => {
  try {
    return await prisma.user.findUnique({
      where: {username},
      select: {
        id: true,
        username: true,
        createdAt: true,
        updatedAt: true,
      },
    })
  } catch (error) {
    console.error('Error fetching user:', error)
    return null
  }
}
