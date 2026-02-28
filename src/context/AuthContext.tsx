import React, {createContext, useContext, useState, ReactNode, useEffect} from 'react'

interface AuthContextType {
  isAuthenticated: boolean
  login: (username: string, password: string) => Promise<boolean>
  logout: () => void
  showPrompt: boolean
  setShowPrompt: (show: boolean) => void
  promptMode: 'login' | 'signup'
  setPromptMode: (mode: 'login' | 'signup') => void
  isAdminMode: boolean
  toggleAdminMode: () => void
  loginError: string
  setLoginError: (error: string) => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const AuthProvider: React.FC<{children: ReactNode}> = ({children}) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [showPrompt, setShowPrompt] = useState(false)
  const [promptMode, setPromptMode] = useState<'login' | 'signup'>('login')
  const [isAdminMode, setIsAdminMode] = useState(false)
  const [loginError, setLoginError] = useState('')

  useEffect(() => {
    // Check if user was previously authenticated in this session
    const authenticated = sessionStorage.getItem('portfolioAuthenticated')
    if (authenticated === 'true') {
      setIsAuthenticated(true)
    }
  }, [])

  const login = async (username: string, password: string): Promise<boolean> => {
    try {
      setLoginError('')
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({username, password}),
      })

      const data = await response.json()

      if (data.success) {
        setIsAuthenticated(true)
        sessionStorage.setItem('portfolioAuthenticated', 'true')
        sessionStorage.setItem('username', username)
        setShowPrompt(false)
        return true
      } else {
        setLoginError(data.message || 'Invalid credentials')
        return false
      }
    } catch (error) {
      console.error('Login error:', error)
      setLoginError('An error occurred during login')
      return false
    }
  }

  const logout = () => {
    setIsAuthenticated(false)
    sessionStorage.removeItem('portfolioAuthenticated')
    setShowPrompt(false)
  }

  const toggleAdminMode = () => {
    setIsAdminMode(!isAdminMode)
    if (!isAdminMode) {
      // When enabling admin mode, clear authentication to force prompt on next navigation
      setIsAuthenticated(false)
      sessionStorage.removeItem('portfolioAuthenticated')
    }
  }

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        login,
        logout,
        showPrompt,
        setShowPrompt,
        promptMode,
        setPromptMode,
        isAdminMode,
        toggleAdminMode,
        loginError,
        setLoginError,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within AuthProvider')
  }
  return context
}
