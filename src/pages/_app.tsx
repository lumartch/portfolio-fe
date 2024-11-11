import type { AppProps } from 'next/app';

import { Layout, Theme } from '@/components';
import Head from 'next/head';
import '@/styles/globals.css';
import React from 'react';

export default function App ({ Component, pageProps }: AppProps) {
  return (
    <Theme>
      <Head>
        <title>Luis Martínez - Portfolio</title>
      </Head>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </Theme>
  );
}
