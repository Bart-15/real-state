import Router from 'next/router';
import { ThemeProvider } from 'next-themes'
import { QueryClient, QueryClientProvider,  } from 'react-query';
import { ReactQueryDevtools } from "react-query/devtools";
import NProgress from 'nprogress';

import '@/styles/globals.css'
import Layout from '@/components/Layout/Layout'
import type { AppProps } from 'next/app'

export default function App({ Component, pageProps }: AppProps) {
	const queryClient = new QueryClient()

	// Nprogress Config
	NProgress.configure({ showSpinner: false });

	Router.events.on('routeChangeStart', () => {
		NProgress.start();
	});

	Router.events.on('routeChangeComplete', () => {
		NProgress.done();
	});

	return (
		<ThemeProvider enableSystem={true} attribute="class">
			<Layout>
				<QueryClientProvider client={queryClient}>
					<Component {...pageProps} />
					<ReactQueryDevtools initialIsOpen={false} />
				</QueryClientProvider>
			</Layout>
		</ThemeProvider>
	)
}
