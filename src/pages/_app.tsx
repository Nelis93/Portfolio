import '../styles/globals.css'
import {AuthProvider} from '@/context/AuthContext'
import ProtectedLayout from '@/components/layouts/ProtectedLayout'

export default function App({Component, pageProps}: any) {
  return (
    <AuthProvider>
      <ProtectedLayout>
        <Component {...pageProps} />
      </ProtectedLayout>
    </AuthProvider>
  )
}
