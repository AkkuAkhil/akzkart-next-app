import '../styles/globals.css';
import Layout from '../components/Layout/Layout';
import Head from 'next/head';

const MyApp = ({ Component, pageProps }) => {
  return (
    <Layout>
      <Head>
        <title>Akzkart</title>
        <meta name='description' content='Akzkart - An e-commerce site' />
        <meta name='keywords' content='e-commerce' />
        <meta name='author' content='Akhildev MJ' />
        <meta name='viewport' content='width=device-width, initial-scale=1.0' />
      </Head>
      <Component {...pageProps} />
    </Layout>
  );
};

export default MyApp;
