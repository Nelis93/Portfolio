import type {NextApiRequest, NextApiResponse} from 'next'
import {Resend} from 'resend'
import {generateResetToken} from '@/utils/auth'
import {generatePasswordResetEmail} from '@/utils/emailTemplates'
import prisma from '@/lib/prisma'

type ResponseData = {
  success: boolean
  message?: string
  resetToken?: string
  resetTokenExpiry?: string
}

const resend = new Resend(process.env.RESEND_API_KEY)

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

    const resetLink = `${process.env.NEXT_PUBLIC_BASE_URL}/reset-password?token=${token}`
    const {subject, html} = generatePasswordResetEmail(user.username, resetLink)

    // Send email via Resend
    try {
      await resend.emails.send({
        from: 'Nelis <noreply@neliseerdekens.info>',
        to: email,
        subject,
        html,
      })

      console.log(`✅ Password reset email sent to ${email}`)
    } catch (emailError) {
      console.error('Resend email error:', emailError)
      // Still return success to avoid revealing if email was sent
      // (but log error for debugging)
    }

    // In development, still log the token for testing
    if (process.env.NODE_ENV === 'development') {
      console.log(`[DEV] Reset link: ${resetLink}`)
      console.log(`[DEV] Token expires at: ${expiry.toISOString()}`)
    }

    return res.status(200).json({
      success: true,
      message: 'If the email exists, a reset link has been generated. Check your email.',
      // Only return token in development for testing
      resetToken: process.env.NODE_ENV === 'development' ? token : undefined,
      resetTokenExpiry: expiry.toISOString(),
    })
  } catch (error) {
    console.error('Forgot password error:', error)
    return res.status(500).json({success: false, message: 'Internal server error'})
  }
}
