import { useEffect, useState, Suspense } from "react";
import Router from "next/router";
import "nprogress/nprogress.css";
import '../styles/globals.css'
import Head from 'next/head'
import FullScreenLoading from "../pages/loading.js";

function MyApp({ Component, pageProps }) {
  const [loading, setLoading] = useState(false);
  const start = () => {
    //NProgress.start();
    setLoading(true);
  };
  const end = () => {
    //NProgress.done();
    setLoading(false);
  };

  useEffect(() => {
    Router.events.on("routeChangeStart", start);
    Router.events.on("routeChangeComplete", end);
    Router.events.on("routeChangeError", end);

    return () => {
      Router.events.off("routeChangeStart", start);
      Router.events.off("routeChangeComplete", end);
      Router.events.off("routeChangeError", end);
    };
  }, []);

   // 페이지가 처음 로드될 때 로딩 상태 처리 에러처리 시 삭제필요
   useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 500);
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
        <Suspense fallback={<p>Loading...</p>}>
        <Component {...pageProps} />
        </Suspense>
        
      )}
    </>
  );
}

export default MyApp
