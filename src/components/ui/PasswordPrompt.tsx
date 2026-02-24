import React, {useState, useEffect} from 'react'
import {useAuth} from '@/context/AuthContext'

interface PasswordPromptProps {
  isOpen: boolean
}

const PasswordPrompt: React.FC<PasswordPromptProps> = ({isOpen}) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [isSignup, setIsSignup] = useState(false)
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const {login, isAdminMode, toggleAdminMode} = useAuth()

  // Reset state when dialog opens
  useEffect(() => {
    if (isOpen) {
      setUsername('')
      setPassword('')
      setConfirmPassword('')
      setIsSignup(false)
      setError('')
    }
  }, [isOpen])

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
          body: JSON.stringify({username, password}),
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
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md mx-4 p-8 animate-fade-in">
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            {isSignup ? 'Create Account' : 'Access Required'}
          </h2>
          <p className="text-gray-600">
            {isSignup ? 'Create a new account to access' : 'Enter your credentials to continue'}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
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
            />
          </div>

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
              autoFocus
            />
          </div>

          {isSignup && (
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
          )}

          {error && <p className="text-red-500 text-sm font-medium">{error}</p>}

          <button
            type="submit"
            disabled={isLoading || !username || !password || (isSignup && !confirmPassword)}
            className="w-full bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg hover:bg-blue-700 transition disabled:bg-blue-400 disabled:cursor-not-allowed"
          >
            {isLoading
              ? isSignup
                ? 'Creating account...'
                : 'Logging in...'
              : isSignup
                ? 'Sign Up'
                : 'Login'}
          </button>
        </form>

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
