/**
 * Email template for password reset
 */
export const generatePasswordResetEmail = (
  username: string,
  resetLink: string,
): {subject: string; html: string} => {
  return {
    subject: 'Reset Your Password',
    html: `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 20px; text-align: center; border-radius: 8px 8px 0 0; }
            .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 8px 8px; }
            .button { display: inline-block; background: #667eea; color: white; padding: 12px 30px; text-decoration: none; border-radius: 5px; margin: 20px 0; font-weight: bold; }
            .footer { text-align: center; color: #999; font-size: 12px; margin-top: 30px; padding-top: 20px; border-top: 1px solid #ddd; }
            .warning { background: #fff3cd; border-left: 4px solid #ffc107; padding: 15px; margin: 20px 0; border-radius: 4px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>Password Reset Request</h1>
            </div>
            
            <div class="content">
              <p>Hi <strong>${username}</strong>,</p>
              
              <p>We received a request to reset your password. Click the button below to set a new password:</p>
              
              <center>
                <a href="${resetLink}" style="display: inline-block; background: #667eea; color: #ffffff; padding: 14px 32px; text-decoration: none; border-radius: 5px; margin: 20px 0; font-weight: bold; font-size: 16px;">Reset Password</a>
              </center>
              
              <p>Or copy and paste this link in your browser:</p>
              <p style="word-break: break-all; background: #fff; padding: 10px; border-radius: 4px; font-size: 12px;">
                ${resetLink}
              </p>
              
              <div class="warning">
                <strong>⚠️ Security Note:</strong> This link will expire in <strong>1 hour</strong>. If you didn't request a password reset, you can safely ignore this email. Your account is secure.
              </div>
              
              <p>Questions? Feel free to reach out to me 🙂.</p>
            </div>
            
            <div class="footer">
              <p>© ${new Date().getFullYear()} Nelis. All rights reserved.</p>
              <p>This is an automated email, please do not reply.</p>
            </div>
          </div>
        </body>
      </html>
    `,
  }
}
