import { QueryClient, QueryClientProvider, Hydrate } from 'react-query'
import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import Layout from '@/components/Layout/Layout'

export default function App({ Component, pageProps }: AppProps) {
  const queryClient = new QueryClient()


  return (
    <Layout>
      <QueryClientProvider client={queryClient}>
          <Component {...pageProps} />
      </QueryClientProvider>
    </Layout>
  )
}
