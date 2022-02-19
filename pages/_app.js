import '../styles/globals.css';
import Layout from '../components/Layout/Layout';
import Head from 'next/head';
import { CartProvider } from '../contexts/CartContext';
import { SessionProvider } from 'next-auth/react';

const MyApp = ({ Component, pageProps: { session, ...pageProps } }) => {
  return (
    <SessionProvider session={session}>
      <CartProvider>
        <Layout>
          <Head>
            <title>Akzkart</title>
            <meta name='description' content='Akzkart - An e-commerce site' />
            <meta name='keywords' content='e-commerce' />
            <meta name='author' content='Akhildev MJ' />
            <meta
              name='viewport'
              content='width=device-width, initial-scale=1.0'
            />
          </Head>
          <Component {...pageProps} />
        </Layout>
      </CartProvider>
    </SessionProvider>
  );
};

export default MyApp;
