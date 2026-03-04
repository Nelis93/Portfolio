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
 * Exempts public pages like password reset
 */
const ProtectedLayout: React.FC<ProtectedLayoutProps> = ({children}) => {
  const router = useRouter()
  const {isAuthenticated, showPrompt, promptMode, setShowPrompt, isAdminMode} = useAuth()
  const isHomePage = router.pathname === '/'
  // Public pages that don't require authentication
  const isPublicPage = router.pathname === '/reset-password'
  const previousPathnameRef = useRef<string | null>(null)

  // Show prompt when accessing protected pages without authentication
  useEffect(() => {
    if (!isHomePage && !isPublicPage && !isAuthenticated && !isAdminMode) {
      setShowPrompt(true)
    }

    // Hide prompt when on home page
    if (isHomePage) {
      setShowPrompt(false)
    }
  }, [isHomePage, isPublicPage, isAuthenticated, isAdminMode, setShowPrompt])

  // In admin mode, show prompt on every navigation to non-home pages
  useEffect(() => {
    if (isAdminMode && !isHomePage && router.pathname !== previousPathnameRef.current) {
      setShowPrompt(true)
    }
    previousPathnameRef.current = router.pathname
  }, [isAdminMode, isHomePage, router.pathname, setShowPrompt])

  // Don't render protected page content if not authenticated
  if (!isHomePage && !isPublicPage && !isAuthenticated && !isAdminMode) {
    return <PasswordPrompt isOpen={showPrompt} initialMode={promptMode} />
  }

  return (
    <>
      {children}
      <PasswordPrompt isOpen={showPrompt} initialMode={promptMode} />
    </>
  )
}

export default ProtectedLayout
