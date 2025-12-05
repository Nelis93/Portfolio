// src/pages/studio/[[...index]].tsx
import dynamic from 'next/dynamic'
import Head from 'next/head'
import type {NextPage} from 'next'

const SanityStudio = dynamic(
  // loader: import the TSX file and return its default export as a component
  () => import('../../../sanity/Studio.tsx').then((mod) => mod.default as any),
  {ssr: false, loading: () => <div style={{padding: 24}}>Loading Studio…</div>},
)

const StudioPage: NextPage = () => {
  return (
    <>
      <Head>
        <title>Studio — Admin</title>
      </Head>

      <div style={{height: '100vh', width: '100%'}}>
        <SanityStudio />
      </div>
    </>
  )
}

export default StudioPage
