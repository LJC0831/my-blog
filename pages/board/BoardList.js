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
import Link from 'next/link';
import { Card, Avatar, CardHeader, Typography } from '@mui/material';
import { red } from '@mui/material/colors';
import CardMedia from '@mui/material/CardMedia';


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
          <Link href={`/board/BoardWrite?id=${board_type}`}>
          <button className={CommonStyle.new_post_button}>새글추가 +</button>
        </Link>
        }
        <h2>{board_type} 작업 관련 게시판입니다.</h2>
        {loading ? (
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
            <img src="/image/loading.gif" alt="Loading" />
          </div>
        ) : (
        <Card>
          <ul className={BoardListStyle.post_list}>
            {posts.map((post) => (
              <li key={post.id} className={BoardListStyle.post_item}>
                <Link href={`/board/BoardWrite?id=${post.id}&content=${post.title.replace(/\s+/g, '-')}`}>
                  <CardHeader
                    avatar={
                      <Avatar sx={{ bgcolor: red[500], width: '100%'}} aria-label="recipe">
                        {board_type}
                      </Avatar>
                    }
                    title={
                      <Typography variant="h6" sx={{ fontWeight: 'bold' , fontFamily: "Pretendard Variable, Pretendard, -apple-system, BlinkMacSystemFont, system-ui, Roboto, 'Helvetica Neue', 'Segoe UI', 'Apple SD Gothic Neo', 'Noto Sans KR', 'Malgun Gothic', 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol', sans-serif"}}> {/* Title 스타일링 */}
                        {post.title}
                      </Typography>
                    }
                    subheader={post.ins_ymdhms}
                  />
                  <div className={BoardListStyle.post_content}>{post.privew_content}</div>
                </Link>
            </li>
            
            ))}
          </ul>
        </Card>
        )}
        </div>
      </div>
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
  );
}

const mainContent = {
  display: 'flex'
};
export default BoardList;