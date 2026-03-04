import type {NextApiRequest, NextApiResponse} from 'next'
import {resetPassword} from '@/utils/auth'

type ResponseData = {
  success: boolean
  message?: string
  username?: string
}

export default async function handler(req: NextApiRequest, res: NextApiResponse<ResponseData>) {
  if (req.method !== 'POST') {
    return res.status(405).json({success: false, message: 'Method not allowed'})
  }

  try {
    const {token, newPassword} = req.body

    if (!token || !newPassword) {
      return res.status(400).json({success: false, message: 'Token and new password required'})
    }

    if (newPassword.length < 6) {
      return res
        .status(400)
        .json({success: false, message: 'Password must be at least 6 characters'})
    }

    const result = await resetPassword(token, newPassword)

    if (!result.success) {
      return res.status(400).json({success: false, message: result.message})
    }

    return res
      .status(200)
      .json({success: true, message: 'Password reset successfully', username: result.username})
  } catch (error) {
    console.error('Reset password error:', error)
    return res.status(500).json({success: false, message: 'Internal server error'})
  }
}
