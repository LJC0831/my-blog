import { useEffect, useState, Suspense } from "react";
import Router from "next/router";
import "nprogress/nprogress.css";
import '../styles/globals.css'
import Head from 'next/head'
import FullScreenLoading from "../pages/loading.js";
import { config } from '@fortawesome/fontawesome-svg-core';
import '@fortawesome/fontawesome-svg-core/styles.css';
import Script from 'next/script';
config.autoAddCss = false;


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

    // 최대 허용 페이지 로드 횟수 및 시간 설정 (예: 200초 동안 200번)
    const MAX_PAGE_LOADS = 200;
    const TIME_LIMIT = 200000; // 200초

    // 현재 페이지 로드 시간 기록
    let pageLoads = JSON.parse(localStorage.getItem('pageLoads')) || [];
    const currentTime = new Date().getTime();
    pageLoads.push(currentTime);

    // 페이지 로드 기록을 시간 제한에 따라 필터링
    pageLoads = pageLoads.filter(timestamp => currentTime - timestamp < TIME_LIMIT);

    // 로컬 스토리지에 업데이트
    localStorage.setItem('pageLoads', JSON.stringify(pageLoads));

    // 비정상적인 패턴 감지
    if (pageLoads.length > MAX_PAGE_LOADS) {
      window.location.href = "/error"; // 예시: 경고 페이지로 리디렉션
    }
  }, []);
 
  return (
    <>
      <Head>
        {/* 초기 title */}
        <title>LJC 개발 블로그</title>
        <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-4150138337602380"
        crossorigin="anonymous"></script>
        <meta charset="utf-8" />
      </Head>
      {loading ? (
        <FullScreenLoading />
      ) : (
        <Component {...pageProps} />
      )}
      <Script src="../assets/js/jquery.min.js" strategy="beforeInteractive" />
      <Script src="../assets/js/jquery.scrollex.min.js" strategy="afterInteractive" />
      <Script src="../assets/js/jquery.scrolly.min.js" strategy="afterInteractive" />
      <Script src="../assets/js/browser.min.js" strategy="afterInteractive" />
      <Script src="../assets/js/breakpoints.min.js" strategy="afterInteractive" />
      <Script src="../assets/js/util.js" strategy="afterInteractive" />
      <Script src="../assets/js/main.js" strategy="afterInteractive" />
    </>
  );
}

export default MyApp
