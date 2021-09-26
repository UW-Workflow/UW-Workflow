import '../styles/globals.css'
import { AuthUserProvider } from '../context/AuthUserContext';
import type { AppProps } from 'next/app'

function MyApp({ Component, pageProps }: AppProps) {
  return <AuthUserProvider><Component {...pageProps} /></AuthUserProvider>
}
export default MyApp
