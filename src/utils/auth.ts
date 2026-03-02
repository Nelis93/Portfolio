import bcrypt from 'bcryptjs'
import {randomBytes} from 'crypto'
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
export const createUser = async (username: string, email: string, password: string) => {
  try {
    const hashedPassword = await hashPassword(password)
    return await prisma.user.create({
      data: {
        username,
        email,
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
        email: true,
        createdAt: true,
        updatedAt: true,
      },
    })
  } catch (error) {
    console.error('Error fetching user:', error)
    return null
  }
}

/**
 * Get user by email (without password)
 */
export const getUserByEmail = async (email: string) => {
  try {
    return await prisma.user.findUnique({
      where: {email},
      select: {
        id: true,
        username: true,
        email: true,
        createdAt: true,
        updatedAt: true,
      },
    })
  } catch (error) {
    console.error('Error fetching user by email:', error)
    return null
  }
}

/**
 * Generate a password reset token
 */
export const generateResetToken = (): {token: string; expiry: Date} => {
  const token = randomBytes(32).toString('hex')
  const expiry = new Date(Date.now() + 1000 * 60 * 60) // 1 hour from now
  return {token, expiry}
}

/**
 * Request password reset - generates and stores reset token
 */
export const requestPasswordReset = async (username: string) => {
  try {
    const user = await prisma.user.findUnique({
      where: {username},
    })

    if (!user) {
      // Don't reveal if user exists for security
      return null
    }

    const {token, expiry} = generateResetToken()

    await prisma.user.update({
      where: {id: user.id},
      data: {
        resetToken: token,
        resetTokenExpiry: expiry,
      },
    })

    return {token, expiry, username: user.username}
  } catch (error) {
    console.error('Error requesting password reset:', error)
    throw error
  }
}

/**
 * Verify reset token and update password
 */
export const resetPassword = async (token: string, newPassword: string) => {
  try {
    const user = await prisma.user.findFirst({
      where: {
        resetToken: token,
        resetTokenExpiry: {
          gt: new Date(), // Token must not be expired
        },
      },
    })

    if (!user) {
      return {success: false, message: 'Invalid or expired reset token'}
    }

    const hashedPassword = await hashPassword(newPassword)

    await prisma.user.update({
      where: {id: user.id},
      data: {
        password: hashedPassword,
        resetToken: null,
        resetTokenExpiry: null,
      },
    })

    return {success: true, message: 'Password reset successfully'}
  } catch (error) {
    console.error('Error resetting password:', error)
    return {success: false, message: 'An error occurred during password reset'}
  }
}
