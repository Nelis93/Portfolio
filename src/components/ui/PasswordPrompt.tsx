import React, {useState, useEffect} from 'react'
import {useAuth} from '@/context/AuthContext'

interface PasswordPromptProps {
  isOpen: boolean
}

const PasswordPrompt: React.FC<PasswordPromptProps> = ({isOpen}) => {
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const {login, isAdminMode, toggleAdminMode} = useAuth()

  // Reset state when dialog opens
  useEffect(() => {
    if (isOpen) {
      setPassword('')
      setError('')
    }
  }, [isOpen])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError('')

    // Simulate a small delay for better UX
    setTimeout(() => {
      const success = login(password)
      if (!success) {
        setError('Incorrect password. Please try again.')
        setPassword('')
      }
      setIsLoading(false)
    }, 300)
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md mx-4 p-8 animate-fade-in">
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Access Required</h2>
          <p className="text-gray-600">Enter the password to continue</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
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

          {error && <p className="text-red-500 text-sm font-medium">{error}</p>}

          <button
            type="submit"
            disabled={isLoading || !password}
            className="w-full bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg hover:bg-blue-700 transition disabled:bg-blue-400 disabled:cursor-not-allowed"
          >
            {isLoading ? 'Verifying...' : 'Submit'}
          </button>
        </form>

        <p className="text-center text-gray-500 text-xs mt-4">
          Demo password:{' '}
          <span className="font-mono bg-gray-100 px-2 py-1 rounded">password123</span>
        </p>

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
      </div>

      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: scale(0.95);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
        .animate-fade-in {
          animation: fade-in 0.3s ease-out;
        }
      `}</style>
    </div>
  )
}

export default PasswordPrompt
