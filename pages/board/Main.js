import Head from 'next/head'
import {React, useEffect, useState, Fragment } from 'react';
import {  Search01, save01, upload01, fileStatUpdate } from '../api/Intro_api';
import 'react-quill/dist/quill.snow.css'; // 에디터의 스타일을 불러옵니다.
import dynamic from 'next/dynamic';
import Header from './Header2';
import Footer from './Footer2';

// 줄바꿈 문자를 <br> 태그로 변환하는 함수
function addLineBreaks(text) {
	const withBreaks = text.split('\n').map((line, index) => (
	  <Fragment key={index}>
		{line}
		<br />
	  </Fragment>
	));
	return withBreaks;
  }
  
const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });
function Main() {

	const initialHTML = ''; // 초기 HTML
	const subjectHTML = ''; // 초기 HTML
	const [isEditing, setIsEditing] = useState(false); // 에디터의 가시성 상태를 저장
	const [introText, setIntroText] = useState(initialHTML); // 에디터의 내용을 저장
	const [subject, setSubject] = useState(subjectHTML);
	const [isLoginYn, setIsLogin] = useState(false);
	//에디터 옵션
	const toolbarOptions = [
		[{ header: [1, 2, 3, 4, 5, 6, false] }],
		["bold", "italic", "underline", "strike"],
		["blockquote"],
		[{ list: "ordered" }, { list: "bullet" }],
		[{ color: [] }, { background: [] }],
		[{ align: [] }],
	];
	const modules = {
		toolbar: {
		container: toolbarOptions,
		},
	};
	const handleIntroTextChange = (value) => {
		setIntroText(value);
	  };
	// 저장처리
	const handleEditButtonClick = async () => {
		setIsEditing(!isEditing); // 편집 버튼 클릭 시 가시성 상태를 토글
		if (isEditing) {
		  await fileStatUpdate();
		  const html = await upload01(introText, 'intro',''); //html, board_type, board_id
		  save01(subject, html);
		}
	  };
	useEffect(() => {
		const loginYn = localStorage.getItem(process.env.NEXT_PUBLIC_IS_LOGGED_IN);
    	setIsLogin(loginYn === 'true');

		setTimeout(() => {
			Search01().then((data) => {
			  setSubject(data[0].subject);
			  setIntroText(data[0].content);
			});
		  }, 300);
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
			<div id="wrapper" className="fade-in">
					<Header/>
					<div id="main">
							<article className="post featured">
								<header className="major">
									<span className="date">Oct 01, 2023</span>
									<h2>{addLineBreaks(subject)}</h2>
									
								</header>
								{isEditing ? (
									<ReactQuill value={introText} onChange={handleIntroTextChange} modules={modules} style={{ width: '50vw' }} />
								) : (
									<span dangerouslySetInnerHTML={{ __html: introText }} />
								)}
								{ isLoginYn && 
									<button onClick={handleEditButtonClick}>
									{isEditing ? '저장' : '편집'}
									</button>
								}
								<a href="#" className="image main"><img src="/image/pic01.jpg" alt="" /></a>
								<ul className="actions special">
									<li><a href="#" className="button large">Full Story</a></li>
								</ul>
							</article>

							<section className="posts">
								<article>
									<header>
										<span className="date">April 24, 2017</span>
										<h2><a href="#">Sed magna<br />
										ipsum faucibus</a></h2>
									</header>
									<a href="#" className="image fit"><img src="/image/pic02.jpg" alt="" /></a>
									<p>Donec eget ex magna. Interdum et malesuada fames ac ante ipsum primis in faucibus. Pellentesque venenatis dolor imperdiet dolor mattis sagittis magna etiam.</p>
									<ul className="actions special">
										<li><a href="#" className="button">Full Story</a></li>
									</ul>
								</article>
								<article>
									<header>
										<span className="date">April 22, 2017</span>
										<h2><a href="#">Primis eget<br />
										imperdiet lorem</a></h2>
									</header>
									<a href="#" className="image fit"><img src="/image/pic03.jpg" alt="" /></a>
									<p>Donec eget ex magna. Interdum et malesuada fames ac ante ipsum primis in faucibus. Pellentesque venenatis dolor imperdiet dolor mattis sagittis magna etiam.</p>
									<ul className="actions special">
										<li><a href="#" className="button">Full Story</a></li>
									</ul>
								</article>
								<article>
									<header>
										<span className="date">April 18, 2017</span>
										<h2><a href="#">Ante mattis<br />
										interdum dolor</a></h2>
									</header>
									<a href="#" className="image fit"><img src="/image/pic04.jpg" alt="" /></a>
									<p>Donec eget ex magna. Interdum et malesuada fames ac ante ipsum primis in faucibus. Pellentesque venenatis dolor imperdiet dolor mattis sagittis magna etiam.</p>
									<ul className="actions special">
										<li><a href="#" className="button">Full Story</a></li>
									</ul>
								</article>
								<article>
									<header>
										<span className="date">April 14, 2017</span>
										<h2><a href="#">Tempus sed<br />
										nulla imperdiet</a></h2>
									</header>
									<a href="#" className="image fit"><img src="/image/pic05.jpg" alt="" /></a>
									<p>Donec eget ex magna. Interdum et malesuada fames ac ante ipsum primis in faucibus. Pellentesque venenatis dolor imperdiet dolor mattis sagittis magna etiam.</p>
									<ul className="actions special">
										<li><a href="#" className="button">Full Story</a></li>
									</ul>
								</article>
								<article>
									<header>
										<span className="date">April 11, 2017</span>
										<h2><a href="#">Odio magna<br />
										sed consectetur</a></h2>
									</header>
									<a href="#" className="image fit"><img src="/image/pic06.jpg" alt="" /></a>
									<p>Donec eget ex magna. Interdum et malesuada fames ac ante ipsum primis in faucibus. Pellentesque venenatis dolor imperdiet dolor mattis sagittis magna etiam.</p>
									<ul className="actions special">
										<li><a href="#" className="button">Full Story</a></li>
									</ul>
								</article>
								<article>
									<header>
										<span className="date">April 7, 2017</span>
										<h2><a href="#">Augue lorem<br />
										primis vestibulum</a></h2>
									</header>
									<a href="#" className="image fit"><img src="/image/pic07.jpg" alt="" /></a>
									<p>Donec eget ex magna. Interdum et malesuada fames ac ante ipsum primis in faucibus. Pellentesque venenatis dolor imperdiet dolor mattis sagittis magna etiam.</p>
									<ul className="actions special">
										<li><a href="#" className="button">Full Story</a></li>
									</ul>
								</article>
							</section>

							<footer>
								<div className="pagination">
									<a href="#" className="previous">Prev</a>
									<a href="#" className="page active">1</a>
									<a href="#" className="page">2</a>
									<a href="#" className="page">3</a>
									<span className="extra">&hellip;</span>
									<a href="#" className="page">8</a>
									<a href="#" className="page">9</a>
									<a href="#" className="page">10</a>
									<a href="#" className="next">Next</a>
								</div>
							</footer>

					</div>

					<Footer/>
			</div>
    </div>
  );
}


export default Main;