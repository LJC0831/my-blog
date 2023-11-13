import '../styles/globals.css'

function MyApp({ Component, pageProps }) {
  <Head>
    {/* 초기title */}
      <title>LJC 개발 블로그</title>
  </Head>
  return <Component {...pageProps} />
}

export default MyApp
