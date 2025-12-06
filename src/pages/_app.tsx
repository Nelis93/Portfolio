import MainLayout from '../components/layouts/MainLayout'
import '../styles/globals.css'

export default function App({Component, pageProps}: any) {
  return (
    <MainLayout>
      <Component {...pageProps} />
    </MainLayout>
  )
}
