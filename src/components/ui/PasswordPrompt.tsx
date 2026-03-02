import React, {useState, useEffect} from 'react'
import {useRouter} from 'next/router'
import {FaXmark} from 'react-icons/fa6'
import {useAuth} from '@/context/AuthContext'

interface PasswordPromptProps {
  isOpen: boolean
  initialMode?: 'login' | 'signup'
}

const PasswordPrompt: React.FC<PasswordPromptProps> = ({isOpen, initialMode = 'login'}) => {
  const router = useRouter()
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [isSignup, setIsSignup] = useState(initialMode === 'signup')
  const [isForgotPassword, setIsForgotPassword] = useState(false)
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [forgotPasswordMessage, setForgotPasswordMessage] = useState('')
  const {login, isAdminMode, toggleAdminMode, setShowPrompt} = useAuth()

  // Handle close and redirect to home
  const handleClose = () => {
    setShowPrompt(false)
    router.push('/')
  }

  // Handle escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        handleClose()
      }
    }

    if (isOpen) {
      document.addEventListener('keydown', handleEscape)
      return () => document.removeEventListener('keydown', handleEscape)
    }
  }, [isOpen])

  // Reset state when dialog opens
  useEffect(() => {
    if (isOpen) {
      setUsername('')
      setEmail('')
      setPassword('')
      setConfirmPassword('')
      setIsSignup(initialMode === 'signup')
      setIsForgotPassword(false)
      setError('')
      setForgotPasswordMessage('')
    }
  }, [isOpen, initialMode])

  const handleForgotPassword = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError('')
    setForgotPasswordMessage('')

    try {
      const response = await fetch('/api/auth/forgot-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({email}),
      })

      const data = await response.json()

      if (data.success) {
        setForgotPasswordMessage(
          `Reset link sent! Check your email or check the console in development mode.${
            process.env.NODE_ENV === 'development' && data.resetToken
              ? ` Reset token: ${data.resetToken}`
              : ''
          }`,
        )
        setEmail('')
      } else {
        setError(data.message || 'Failed to process password reset request.')
      }
    } catch (err) {
      setError('An error occurred. Please try again.')
      console.error(err)
    } finally {
      setIsLoading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError('')

    try {
      if (isSignup) {
        // Signup flow
        if (password !== confirmPassword) {
          setError('Passwords do not match.')
          setIsLoading(false)
          return
        }

        const response = await fetch('/api/auth/signup', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({username, email, password}),
        })

        const data = await response.json()

        if (data.success) {
          setError('')
          // Auto-login after signup
          const loginSuccess = await login(username, password)
          if (!loginSuccess) {
            setError('Account created! Please log in manually.')
            setIsSignup(false)
            setPassword('')
            setConfirmPassword('')
          }
        } else {
          setError(data.message || 'Signup failed. Please try again.')
          setPassword('')
          setConfirmPassword('')
        }
      } else {
        // Login flow
        const success = await login(username, password)
        if (!success) {
          setError('Incorrect credentials. Please try again.')
          setPassword('')
        }
      }
    } catch (err) {
      setError('An error occurred. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md mx-4 p-8 animate-fade-in relative">
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 transition"
          title="Close (ESC)"
        >
          <FaXmark className="text-xl" />
        </button>

        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            {isForgotPassword ? 'Reset Password' : isSignup ? 'Create Account' : 'Access Required'}
          </h2>
          <p className="text-gray-600">
            {isForgotPassword
              ? 'Enter your email address to receive a password reset link'
              : isSignup
                ? 'Create a new account to access'
                : 'Enter your credentials to continue'}
          </p>
        </div>

        <form
          onSubmit={isForgotPassword ? handleForgotPassword : handleSubmit}
          className="space-y-4"
        >
          {!isForgotPassword ? (
            <div>
              <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-2">
                Username
              </label>
              <input
                id="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter username"
                disabled={isLoading}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition disabled:bg-gray-100"
                autoFocus
              />
            </div>
          ) : (
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                Email Address
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter email"
                disabled={isLoading}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition disabled:bg-gray-100"
                autoFocus
              />
            </div>
          )}

          {!isForgotPassword && (
            <>
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                  Password
                </label>
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter password"
                  disabled={isLoading}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition disabled:bg-gray-100"
                />
              </div>

              {isSignup && (
                <>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                      Email Address
                    </label>
                    <input
                      id="email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter email"
                      disabled={isLoading}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition disabled:bg-gray-100"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="confirmPassword"
                      className="block text-sm font-medium text-gray-700 mb-2"
                    >
                      Confirm Password
                    </label>
                    <input
                      id="confirmPassword"
                      type="password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      placeholder="Confirm password"
                      disabled={isLoading}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition disabled:bg-gray-100"
                    />
                  </div>
                </>
              )}
            </>
          )}

          {error && <p className="text-red-500 text-sm font-medium">{error}</p>}
          {forgotPasswordMessage && (
            <p className="text-green-600 text-sm font-medium">{forgotPasswordMessage}</p>
          )}

          <button
            type="submit"
            disabled={
              isLoading ||
              (isForgotPassword ? !email : !username) ||
              (!isForgotPassword && !password) ||
              (!isForgotPassword && isSignup && !confirmPassword)
            }
            className="w-full bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg hover:bg-blue-700 transition disabled:bg-blue-400 disabled:cursor-not-allowed"
          >
            {isLoading
              ? isForgotPassword
                ? 'Sending reset link...'
                : isSignup
                  ? 'Creating account...'
                  : 'Logging in...'
              : isForgotPassword
                ? 'Send Reset Link'
                : isSignup
                  ? 'Sign Up'
                  : 'Login'}
          </button>
        </form>

        {!isForgotPassword ? (
          <>
            <p className="text-center text-sm text-gray-600 mt-4">
              {isSignup ? 'Already have an account? ' : "Don't have an account? "}
              <button
                type="button"
                onClick={() => {
                  setIsSignup(!isSignup)
                  setError('')
                  setPassword('')
                  setConfirmPassword('')
                }}
                className="text-blue-600 hover:text-blue-700 font-medium"
              >
                {isSignup ? 'Login' : 'Sign Up'}
              </button>
            </p>

            {!isSignup && (
              <p className="text-center text-sm text-gray-600 mt-2">
                <button
                  type="button"
                  onClick={() => {
                    setIsForgotPassword(true)
                    setError('')
                    setPassword('')
                    setEmail('')
                  }}
                  className="text-blue-600 hover:text-blue-700 font-medium"
                >
                  Forgot password?
                </button>
              </p>
            )}
          </>
        ) : (
          <p className="text-center text-sm text-gray-600 mt-4">
            <button
              type="button"
              onClick={() => {
                setIsForgotPassword(false)
                setError('')
                setForgotPasswordMessage('')
                setEmail('')
              }}
              className="text-blue-600 hover:text-blue-700 font-medium"
            >
              Back to login
            </button>
          </p>
        )}

        {username === 'AdminIsMe' && (
          <button
            type="button"
            onClick={toggleAdminMode}
            className={`w-full mt-3 py-2 px-4 rounded-lg text-sm font-medium transition ${
              isAdminMode
                ? 'bg-red-100 text-red-700 hover:bg-red-200'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            {isAdminMode ? '🔒 Admin Mode: ON (prompt every time)' : '🔓 Admin Mode: OFF'}
          </button>
        )}
      </div>
    </div>
  )
}

export default PasswordPrompt
