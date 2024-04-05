import { useEffect, useState } from "react";
import Router from "next/router";
import "nprogress/nprogress.css";
import '../styles/globals.css'
import Head from 'next/head'
import FullScreenLoading from "../pages/loading.js";

function MyApp({ Component, pageProps }) {
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const start = () => {
      //NProgress.start();
      setLoading(true);
    };
    const end = () => {
      //NProgress.done();
      setLoading(false);
    };

    Router.events.on("routeChangeStart", start);
    Router.events.on("routeChangeComplete", end);
    Router.events.on("routeChangeError", end);

    return () => {
      Router.events.off("routeChangeStart", start);
      Router.events.off("routeChangeComplete", end);
      Router.events.off("routeChangeError", end);
    };
  }, []);
 
  return (
    <>
      <Head>
        {/* 초기 title */}
        <title>LJC 개발 블로그</title>
      </Head>
      {loading ? (
        <FullScreenLoading />
      ) : (
        <Component {...pageProps} />
      )}
    </>
  );
}

export default MyApp
