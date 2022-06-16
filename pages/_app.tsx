import '../styles/globals.css'
import type { AppProps } from 'next/app'
import ProductProvider from '../context/product/ProductProvider'
import AuthProvider from '../context/auth/AuthProvider'

function MyApp({ Component, pageProps }: AppProps) {
  return (
  <AuthProvider>
    <ProductProvider>
      <Component {...pageProps} />
    </ProductProvider>
  </AuthProvider>
  )
}

export default MyApp
