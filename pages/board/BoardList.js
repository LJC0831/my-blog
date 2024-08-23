import Head from 'next/head'
import {React, useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import 'react-quill/dist/quill.snow.css'; // 에디터의 스타일을 불러옵니다.
import Header from './Header2';
import Footer from './Footer2';
import { Search01 } from '../api/BoardList_api';
import CommonStyle from '../../styles/common.module.css';
import Link from 'next/link';

function BoardList() {
  const router = useRouter();
  const { board_type } = router.query;
  const [loading, setLoading] = useState(true);
  const [posts, setPosts] = useState([]);
  const [isLoginYn, setIsLogin] = useState(false);

  useEffect(() => {
    const loginYn = localStorage.getItem(process.env.NEXT_PUBLIC_IS_LOGGED_IN);
    setIsLogin(loginYn === 'true');
    // 여기에서 게시글 데이터를 가져오는 API 호출 또는 데이터 로딩 로직을 작성
    // 이 예제에서는 더미 데이터를 사용
    const fetchData = async () => {
      try {
        setTimeout(() => {
          Search01(board_type).then((data) => {
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
  }, [board_type]);

  return (
    <div>
      <Head>
        <title>게시글 목록</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <div id="main">
        
      { isLoginYn && 
        <div>
          <Link href={`/board/BoardWrite?id=${board_type}`}>
            <button>새글추가</button>
          </Link>
        </div>
      }
      {loading ? (
                <div className={CommonStyle.loading_overlay}>
                  <img src="/image/loading.gif" alt="Loading" className={CommonStyle.loading_spinner}/>
                </div>
              ) : (
                <section className="posts">
                  {posts.map((post) => (
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
              )
      }
      
          <Footer/>
      </div>
    </div>
  );
}

export default BoardList;