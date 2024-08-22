import Head from 'next/head'
import {React, useEffect, useState} from 'react';
import { Search01 } from '../api/Header_api';
import Link from 'next/link';

function Main() {
    const [boardList, setBoardListData] = useState([]); // 관련게시판 배열
	const toggleNavPanel = () => {
		
	  };

	useEffect(() => {
        Search01().then((data) => {
			try{
				const data2 = data.map((data2) => {
				return {
					board_type: data2.board_type,
					board_api: data2.board_api,
					order_no: data2.order_no,
					board_nm: data2.board_nm,
					board_icon: data2.board_icon
				};
			});
			setBoardListData(data2);
			} catch{
				console.log("Navigator Search01 오류발생")
			}
		});
		
	}, []); // 빈 배열을 전달하여 컴포넌트 마운트 시 한 번만 실행

  return (
    <div>
      <Head>
        <title>LJC Developer Blog 인트로입니다.</title>
        <link rel="icon" href="/favicon.ico" />
        <meta name="viewport" content="width=device-width, initial-scale=1, user-scalable=no" />
		<link rel="stylesheet" href="/assets/css/main.css" />
		<noscript><link rel="stylesheet" href="/assets/css/noscript.css" /></noscript>
      </Head>
			<div>
					<div id="intro">
						<h1>LJC Developer Blog</h1>
						<p>This blog is a personal website created with Next.js + node.js. The design is referenced from <a href="https://html5up.net">HTML5 UP</a><br />
						and is hosted on <a href="https://vercel.com">vercel</a>.<br/> See<a href="https://html5up.net/license"> license</a></p>
						<ul className="actions">
							<li><a href="#nav" className="button icon solid solo fa-arrow-down scrolly">Continue</a></li>
						</ul>
					</div>

					<nav id="nav">
						<ul className="links">
							<li className="active"><a href="index.html">INTRO</a></li>
							{boardList.map((data, index) => (
								<li key={index}>
								<Link href={`${data.board_api}?board_type=${data.board_type}`}>{data.board_nm}</Link>
								</li>
							))}
							{/* <li className="active"><a href="index.html">Frontend</a></li>
							<li><a href="generic.html">backend</a></li>
							<li><a href="elements.html">ERROR resolution</a></li>
                            <li><a href="elements.html">algorithm</a></li>
                            <li><a href="elements.html">ETC</a></li> */}
						</ul>
						<ul className="icons">
							<li><a href="https://github.com/LJC0831" className="icon brands fa-github"><span className="label">GitHub</span></a></li>
						</ul>
					</nav>

					<a href="#navPanel" id="navPanelToggle" onClick={toggleNavPanel}>Menu</a>
			</div>
    </div>
  );
}


export default Main;