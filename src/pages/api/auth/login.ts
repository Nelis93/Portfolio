import type {NextApiRequest, NextApiResponse} from 'next'
import {authenticateUser} from '@/utils/auth'

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

    const isAuthenticated = await authenticateUser(username, password)

    if (isAuthenticated) {
      return res.status(200).json({success: true, message: 'Authentication successful'})
    } else {
      return res.status(401).json({success: false, message: 'Invalid credentials'})
    }
  } catch (error) {
    console.error('Login error:', error)

    return res.status(500).json({success: false, message: 'Internal server error'})
  }
}
