import type {NextApiRequest, NextApiResponse} from 'next'
import {createUser, getUserByUsername} from '@/utils/auth'

type ResponseData = {
  success: boolean
  message?: string
}

export default async function handler(req: NextApiRequest, res: NextApiResponse<ResponseData>) {
  if (req.method !== 'POST') {
    return res.status(405).json({success: false, message: 'Method not allowed'})
  }

  try {
    const {username, password} = req.body

    if (!username || !password) {
      return res.status(400).json({success: false, message: 'Username and password required'})
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

    // Create new user
    await createUser(username, password)
    return res.status(201).json({success: true, message: 'User created successfully'})
  } catch (error: any) {
    console.error('Signup error:', error)
    if (error.code === 'P2002') {
      return res.status(409).json({success: false, message: 'Username already exists'})
    }
    return res.status(500).json({success: false, message: 'Internal server error'})
  }
}
