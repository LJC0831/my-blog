import Head from 'next/head'
import styles from '../../styles/Home.module.css'
import {React, useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import 'react-quill/dist/quill.snow.css'; // 에디터의 스타일을 불러옵니다.
import Header from './Header';
import Navigator from './Navigator';
import CommonStyle from '../../styles/common.module.css';
import BoardListStyle from '../../styles/BoardList.module.css';
import { Search01 } from '../api/BoardList_api';


function BoardList() {
  const router = useRouter();
  const { board_type } = router.query;
  const [loading, setLoading] = useState(true);
  const [posts, setPosts] = useState([]);
  const [isLoginYn, setIsLogin] = useState(false);

  const handleItemClick = (id, privew_content) => {
  };
  const handleInsertButton = () => {
  };

  useEffect(() => {
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    setIsLogin(isLoggedIn === 'true');
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
        setLoading(false);
      } catch (error) {
        console.error('데이터를 가져오는 중 오류가 발생했습니다.', error);
      }
    };
    fetchData();
  }, [board_type]);

  if (loading) {
    return <div>Loading...</div>;
  }


  return (
    <div className={styles.container}>
      <Head>
        <title>게시글 목록</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <div style={mainContent}>
        <Navigator />
        <div className={CommonStyle.board_content}>
        { isLoginYn && 
          <button className={CommonStyle.new_post_button} onClick={handleInsertButton}>새글추가 +</button>
        }
        <h2>Vue.js 작업 관련 게시판입니다.</h2>
        <ul className={BoardListStyle.post_list}>
          {posts.map((post) => (
            <li key={post.id} className={BoardListStyle.post_item} onClick={() => handleItemClick(post.id, post.privew_content)}>
              <div className={BoardListStyle.post_title}>{post.title}
              </div>
              <div className={BoardListStyle.post_content}>{post.privew_content}</div>
              <div className={BoardListStyle.post_content}>
                <span className={BoardListStyle.post_right}>입력일자 : {post.ins_ymdhms}</span>
              </div>
          </li>
          ))}
        </ul>
        </div>
      </div>
      <footer className={styles.footer}>
        <a
          href="https://github.com/LJC0831/my-blog"
          target="_blank"
          rel="noopener noreferrer"
        >
          제작자 by LJC
        </a>
      </footer>
    </div>
  );
}

const mainContent = {
  display: 'flex'
};
export default BoardList;