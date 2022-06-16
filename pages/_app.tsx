import '../styles/globals.css'
import type { AppProps } from 'next/app'
import ProductProvider from '../context/product/ProductProvider'
import AuthProvider from '../context/auth/AuthProvider'
import { SnackbarProvider } from 'notistack';

function MyApp({ Component, pageProps }: AppProps) {
  return (
  <SnackbarProvider>
  <AuthProvider>
    <ProductProvider>
      <Component {...pageProps} />
    </ProductProvider>
  </AuthProvider>
  </SnackbarProvider>
  )
}

export default MyApp
