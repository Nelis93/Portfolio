import React, {useEffect, useRef} from 'react'
import {useRouter} from 'next/router'
import {useAuth} from '@/context/AuthContext'
import PasswordPrompt from '@/components/ui/PasswordPrompt'

interface ProtectedLayoutProps {
  children: React.ReactNode
}

/**
 * Layout component that protects non-home pages with authentication
 * Shows password prompt when accessing non-home pages without being authenticated
 */
const ProtectedLayout: React.FC<ProtectedLayoutProps> = ({children}) => {
  const router = useRouter()
  const {isAuthenticated, showPrompt, setShowPrompt, isAdminMode} = useAuth()
  const isHomePage = router.pathname === '/'
  const previousPathnameRef = useRef<string | null>(null)

  // Show prompt when accessing protected pages without authentication
  useEffect(() => {
    if (!isHomePage && !isAuthenticated && !isAdminMode) {
      setShowPrompt(true)
    }

    // Hide prompt when on home page
    if (isHomePage) {
      setShowPrompt(false)
    }
  }, [isHomePage, isAuthenticated, isAdminMode, setShowPrompt])

  // In admin mode, show prompt on every navigation to non-home pages
  useEffect(() => {
    if (isAdminMode && !isHomePage && router.pathname !== previousPathnameRef.current) {
      setShowPrompt(true)
    }
    previousPathnameRef.current = router.pathname
  }, [isAdminMode, isHomePage, router.pathname, setShowPrompt])

  // Don't render protected page content if not authenticated
  if (!isHomePage && !isAuthenticated && !isAdminMode) {
    return <PasswordPrompt isOpen={showPrompt} />
  }

  return (
    <>
      {children}
      <PasswordPrompt isOpen={showPrompt} />
    </>
  )
}

export default ProtectedLayout
