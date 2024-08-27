import Head from 'next/head'
import { useRouter } from 'next/router';
import styles from '../../styles/Home.module.css'
import Header from '../board/Header'
import { Search02 } from '../api/BoardList_api';
import CommonStyle from '../../styles/common.module.css';
import {React, useState, useEffect } from 'react';
import Link from 'next/link';

export default function Home() {
  const router = useRouter();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 8; //페이징할 컨텐츠 개수
  //페이징 처리
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setTimeout(() => {
          const { keyword } = router.query;
          Search02(keyword).then((data) => {
            if(data.length > 0){
              setPosts(data);
              setLoading(false);
            }
          });
        }, 100);
      } catch (error) {
        console.error('데이터를 가져오는 중 오류가 발생했습니다.', error);
      }
    };
    fetchData();
  }, []);

  return (
    <div>
      <Head>
        <title>게시글 목록</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      {loading ? (
        <div className={CommonStyle.loading_overlay}>
          <img src="/image/loading.gif" alt="Loading" className={CommonStyle.loading_spinner}/>
        </div>
        ):(
      <div id="main">
        {posts.length > 0 ? ( 
        <div><h3>검색결과</h3></div>
         ) : (
          <div><h3>검색결과 0건</h3></div>
          )}
        <section className="posts">
          {currentPosts.map((post) => (
                <article key={post.id}>
                  <header>
                    <span className="date">{post.ins_ymdhms}</span>
                    <h2>{post.title}</h2>
                  </header>
                  <Link href={`/board/BoardWrite?id=${post.id}&content=${post.title.replace(/\s+/g, '-')}`}>
                    <span className="image fit"><img src={post.thumbnail_url} alt="" /></span>
                      <p>{post.privew_content}</p>
                    <ul className="actions special">
                      <li><span className="button">Full Story</span></li>
                    </ul>
                  </Link>
                </article>
            ))}
          </section>
          
          <footer>
              <div className="pagination">
                <a href="#main" className={`previous ${currentPage === 1 ? 'disabled' : ''}`}
                  onClick={() => currentPage > 1 && paginate(currentPage - 1)}>
                  Prev
                </a>
                {[...Array(Math.ceil(posts.length / postsPerPage)).keys()].map((number) => (
                  <a href="#main" key={number + 1} className={`page ${currentPage === number + 1 ? 'active' : ''}`}
                    onClick={() => paginate(number + 1)}>
                    {number + 1}
                  </a>
                ))}
                <a href="#main" className={`next ${currentPage === Math.ceil(posts.length / postsPerPage) ? 'disabled' : ''}`}
                  onClick={() => currentPage < Math.ceil(posts.length / postsPerPage) && paginate(currentPage + 1)}>
                  Next
                </a>
              </div>
            </footer>
      </div>
      )}

      <footer className={styles.footer}>
          <p>
            <a href="https://github.com/LJC0831/my-blog"
                target="_blank"
                rel="noopener noreferrer">
              <span>저자 : LJC</span><br/>
              <span>이메일 : leejc831@naver.com</span><br/>
              <span>Copyright 2024. cocoder. All Rights Reserved.</span>
            </a>
          </p>
      </footer>
      
    </div>
  )
};

const mainContent = {
  display: 'flex'
};
