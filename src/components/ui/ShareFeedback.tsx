import {createContext, useCallback, useContext, useState, type ReactNode} from 'react'

type ShareFeedbackContextValue = {
  notifyLinkCopied: () => void
}

const ShareFeedbackContext = createContext<ShareFeedbackContextValue | null>(null)

export function ShareFeedbackProvider({children}: {children: ReactNode}) {
  const [visible, setVisible] = useState(false)

  const notifyLinkCopied = useCallback(() => {
    setVisible(true)
    window.setTimeout(() => setVisible(false), 2000)
  }, [])

  return (
    <ShareFeedbackContext.Provider value={{notifyLinkCopied}}>
      {children}
      {visible && (
        <div
          role="status"
          aria-live="polite"
          className="fixed bottom-6 left-1/2 z-[100] -translate-x-1/2 rounded-lg bg-gray-800/95 px-4 py-2 text-sm text-white shadow-lg border border-gray-600"
        >
          Link copied
        </div>
      )}
    </ShareFeedbackContext.Provider>
  )
}

export function useShareFeedback() {
  const context = useContext(ShareFeedbackContext)
  if (!context) {
    throw new Error('useShareFeedback must be used within ShareFeedbackProvider')
  }
  return context
}
