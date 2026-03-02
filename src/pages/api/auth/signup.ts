import type {NextApiRequest, NextApiResponse} from 'next'
import {createUser, getUserByUsername, getUserByEmail} from '@/utils/auth'

type ResponseData = {
  success: boolean
  message?: string
}

// Simple email validation regex
const isValidEmail = (email: string) => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}

export default async function handler(req: NextApiRequest, res: NextApiResponse<ResponseData>) {
  if (req.method !== 'POST') {
    return res.status(405).json({success: false, message: 'Method not allowed'})
  }

  try {
    const {username, email, password} = req.body

    if (!username || !email || !password) {
      return res
        .status(400)
        .json({success: false, message: 'Username, email, and password required'})
    }

    if (!isValidEmail(email)) {
      return res.status(400).json({success: false, message: 'Invalid email address'})
    }

    if (password.length < 6) {
      return res
        .status(400)
        .json({success: false, message: 'Password must be at least 6 characters'})
    }

    // Check if user already exists
    const existingUser = await getUserByUsername(username)
    if (existingUser) {
      return res.status(409).json({success: false, message: 'Username already exists'})
    }

    // Check if email already exists
    const existingEmail = await getUserByEmail(email)
    if (existingEmail) {
      return res.status(409).json({success: false, message: 'Email already registered'})
    }

    // Create new user
    await createUser(username, email, password)
    return res.status(201).json({success: true, message: 'User created successfully'})
  } catch (error: any) {
    console.error('Signup error:', error)
    if (error.code === 'P2002') {
      return res.status(409).json({success: false, message: 'Username or email already exists'})
    }
    return res.status(500).json({success: false, message: 'Internal server error'})
  }
}
