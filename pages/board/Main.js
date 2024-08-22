import Head from 'next/head'
import {React, useEffect } from 'react';

function Main() {
  // 처음 렌더링 시 Search01 함수 호출
  useEffect(() => {
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

					<div id="intro">
						<h1>LJC Developer Blog</h1>
						<p>This blog is a personal website created with Next.js + node.js. The design is referenced from <a href="https://html5up.net">HTML5 UP</a><br />
						and is hosted on <a href="https://vercel.com">vercel</a>.<br/> See<a href="https://html5up.net/license"> license</a></p>
						<ul className="actions">
							<li><a href="#header" className="button icon solid solo fa-arrow-down scrolly">Continue</a></li>
						</ul>
					</div>

					<header id="header">
						<a href="Intro?board_type=Intro" className="logo">INTRO</a>
					</header>

					<nav id="nav">
						<ul className="links">
							<li className="active"><a href="index.html">Frontend</a></li>
							<li><a href="generic.html">backend</a></li>
							<li><a href="elements.html">ERROR resolution</a></li>
                            <li><a href="elements.html">algorithm</a></li>
                            <li><a href="elements.html">ETC</a></li>
						</ul>
						<ul className="icons">
							<li><a href="https://github.com/LJC0831" className="icon brands fa-github"><span className="label">GitHub</span></a></li>
						</ul>
					</nav>

					<div id="main">

							<article className="post featured">
								<header className="major">
									<span className="date">April 25, 2017</span>
									<h2><a href="#">And this is a<br />
									massive headline</a></h2>
									<p>Aenean ornare velit lacus varius enim ullamcorper proin aliquam<br />
									facilisis ante sed etiam magna interdum congue. Lorem ipsum dolor<br />
									amet nullam sed etiam veroeros.</p>
								</header>
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

					<footer id="footer">
						<section>
							<form method="post" action="#">
								<div className="fields">
									<div className="field">
										<label for="name">Name</label>
										<input type="text" name="name" id="name" />
									</div>
									<div className="field">
										<label for="email">Email</label>
										<input type="text" name="email" id="email" />
									</div>
									<div className="field">
										<label for="message">Message</label>
										<textarea name="message" id="message" rows="3"></textarea>
									</div>
								</div>
								<ul className="actions">
									<li><input type="submit" value="Send Message" /></li>
								</ul>
							</form>
						</section>
						<section className="split contact">
							<section className="alt">
								<h3>Address</h3>
								<p>1234 Somewhere Road #87257<br />
								Nashville, TN 00000-0000</p>
							</section>
							<section>
								<h3>Phone</h3>
								<p><a href="#">(000) 000-0000</a></p>
							</section>
							<section>
								<h3>Email</h3>
								<p><a href="#">info@untitled.tld</a></p>
							</section>
							<section>
								<h3>Social</h3>
								<ul className="icons alt">
									<li><a href="#" className="icon brands alt fa-twitter"><span className="label">Twitter</span></a></li>
									<li><a href="#" className="icon brands alt fa-facebook-f"><span className="label">Facebook</span></a></li>
									<li><a href="#" className="icon brands alt fa-instagram"><span className="label">Instagram</span></a></li>
									<li><a href="#" className="icon brands alt fa-github"><span className="label">GitHub</span></a></li>
								</ul>
							</section>
						</section>
					</footer>
					<div id="copyright">
						<ul><li>&copy; Untitled</li><li>Design: <a href="https://html5up.net">HTML5 UP</a></li></ul>
					</div>

			</div>
    </div>
  );
}


export default Main;