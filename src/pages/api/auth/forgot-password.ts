import type {NextApiRequest, NextApiResponse} from 'next'
import {generateResetToken} from '@/utils/auth'
import prisma from '@/lib/prisma'

type ResponseData = {
  success: boolean
  message?: string
  resetToken?: string
  resetTokenExpiry?: string
}

export default async function handler(req: NextApiRequest, res: NextApiResponse<ResponseData>) {
  if (req.method !== 'POST') {
    return res.status(405).json({success: false, message: 'Method not allowed'})
  }

  try {
    const {email} = req.body

    if (!email) {
      return res.status(400).json({success: false, message: 'Email required'})
    }

    const user = await prisma.user.findUnique({
      where: {email},
    })

    if (!user) {
      // Don't reveal if email exists for security
      return res.status(200).json({
        success: true,
        message: 'If the email exists, a reset link has been generated. Check your email.',
      })
    }

    const {token, expiry} = generateResetToken()

    await prisma.user.update({
      where: {id: user.id},
      data: {
        resetToken: token,
        resetTokenExpiry: expiry,
      },
    })

    // For development/testing: return the token and link
    // In production, you would send this via email instead
    const resetLink = `${process.env.NEXT_PUBLIC_BASE_URL}/reset-password?token=${token}`

    console.log(`[DEV] Password reset requested for ${user.email} (${user.username})`)
    console.log(`[DEV] Reset link: ${resetLink}`)
    console.log(`[DEV] Token expires at: ${expiry.toISOString()}`)

    return res.status(200).json({
      success: true,
      message: 'Password reset email sent. Check console in development.',
      resetToken: process.env.NODE_ENV === 'development' ? token : undefined,
      resetTokenExpiry: expiry.toISOString(),
    })
  } catch (error) {
    console.error('Forgot password error:', error)
    return res.status(500).json({success: false, message: 'Internal server error'})
  }
}
