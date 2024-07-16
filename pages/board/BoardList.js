import Head from 'next/head'
import styles from '../../styles/Home.module.css'
import {React, useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import 'react-quill/dist/quill.snow.css'; // 에디터의 스타일을 불러옵니다.
import Header from './Header';
import Footer from './Footer';
import Navigator from './Navigator';
import CommonStyle from '../../styles/common.module.css';
import BoardListStyle from '../../styles/BoardList.module.css';
import { Search01 } from '../api/BoardList_api';
import Link from 'next/link';
import { Card, Avatar, CardHeader, Typography } from '@mui/material';
import { red } from '@mui/material/colors';


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
        <div className={BoardListStyle.hr_container }>
          <div className={BoardListStyle.hr_line}></div>
          {loading ? (
            <div className={BoardListStyle.hr_text}><h2>{board_type}</h2></div>
          ): (
            <div className={BoardListStyle.hr_text}><h2>{posts[0].board_nm} 게시판</h2></div>
          )}
          <div className={BoardListStyle.hr_line}></div>
        </div>
        {loading ? (
          <div className={CommonStyle.loading_overlay}>
            <img src="/image/loading.gif" alt="Loading" className={CommonStyle.loading_spinner}/>
          </div>
        ) : (
        <Card>
          <ul>
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
                      <Typography variant="h7" sx={{ fontWeight: 'bold' , fontFamily: "Pretendard Variable, Pretendard, -apple-system, BlinkMacSystemFont, system-ui, Roboto, 'Helvetica Neue', 'Segoe UI', 'Apple SD Gothic Neo', 'Noto Sans KR', 'Malgun Gothic', 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol', sans-serif"}}> {/* Title 스타일링 */}
                        {post.title}
                      </Typography>
                    }
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
      <Footer/>
    </div>
  );
}

const mainContent = {
  display: 'flex'
};
export default BoardList;