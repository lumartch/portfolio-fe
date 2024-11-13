import type { AppProps } from 'next/app';

import { Layout } from '@/components';
import { Theme } from '@/theme';
import '@/styles/globals.css';
import Head from 'next/head';
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
