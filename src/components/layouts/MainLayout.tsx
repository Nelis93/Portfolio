import {ReactNode} from 'react'
import {Header} from '../ui'

export default function MainLayout({children}: {children: ReactNode}) {
  return (
    <>
      <Header socials={[]} setSelectedFilter={undefined} style={''} />
      <main>{children}</main>
      {/* optional Footer */}
    </>
  )
}
