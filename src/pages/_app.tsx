
import type { AppProps } from 'next/app'

import { Layout, Theme } from '@/components';
import '@/styles/globals.css';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Theme>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </Theme>
  );
}
