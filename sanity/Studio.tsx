// sanity/Studio.tsx
import React from 'react'

/**
 * This wrapper dynamically mounts the Sanity Studio client-side.
 *
 * It imports the "Studio" React component from the 'sanity' package
 * and passes your existing sanity config (sanity.config.ts).
 *
 * If your root sanity.config.ts doesn't `export default`, adjust the import.
 */
const SanityStudio = React.lazy(async () => {
  // The two imports below are loaded client-side only (because the page uses ssr: false)
  const [{Studio}, sanityConfigModule] = await Promise.all([
    // Sanity exposes a Studio component from the 'sanity' package
    // (Sanity v3 exports; if your install differs, you may need to import differently).
    import('sanity'),
    import('../sanity.config'),
  ])

  // sanityConfigModule could be a default export or named; handle both:
  const config = (sanityConfigModule && (sanityConfigModule.default ?? sanityConfigModule)) as any

  // Return a component that renders the Studio with your config
  return {
    default: function ClientStudio() {
      return <Studio config={config} />
    },
  }
})

export default function StudioWrapper() {
  return (
    <React.Suspense fallback={<div style={{padding: 24}}>Loading Studio (client)…</div>}>
      <div style={{height: '100%', width: '100%'}}>
        <SanityStudio />
      </div>
    </React.Suspense>
  )
}
