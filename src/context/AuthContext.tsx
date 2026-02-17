import React, {createContext, useContext, useState, ReactNode, useEffect} from 'react'

interface AuthContextType {
  isAuthenticated: boolean
  login: (password: string) => boolean
  logout: () => void
  showPrompt: boolean
  setShowPrompt: (show: boolean) => void
  isAdminMode: boolean
  toggleAdminMode: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const AuthProvider: React.FC<{children: ReactNode}> = ({children}) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [showPrompt, setShowPrompt] = useState(false)
  const [isAdminMode, setIsAdminMode] = useState(false)

  // Hardcoded password for now - you can change this later
  const CORRECT_PASSWORD = 'password123'

  useEffect(() => {
    // Check if user was previously authenticated in this session
    const authenticated = sessionStorage.getItem('portfolioAuthenticated')
    if (authenticated === 'true') {
      setIsAuthenticated(true)
    }
  }, [])

  const login = (password: string): boolean => {
    if (password === CORRECT_PASSWORD) {
      setIsAuthenticated(true)
      sessionStorage.setItem('portfolioAuthenticated', 'true')
      setShowPrompt(false)
      return true
    }
    return false
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
        isAdminMode,
        toggleAdminMode,
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
