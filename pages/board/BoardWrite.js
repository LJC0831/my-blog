import Head from 'next/head'
import styles from '../../styles/Home.module.css'
import {React, useState, useEffect, Fragment } from 'react';
import 'react-quill/dist/quill.snow.css'; // 에디터의 스타일을 불러옵니다.
import Header from './Header';
import Navigator from './Navigator';
import dynamic from 'next/dynamic';
import CommonStyle from '../../styles/common.module.css';
import { save01, Search01, Search02, Search03, update01, upload01, fileStatUpdate, save02 } from '../api/BoardWrite_api';
import { useRouter } from 'next/router';

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

function BoardWrite() {
  const router = useRouter();
  const { id } = router.query; //게시글번호
  const titletHTML = ''; // 초기 HTML
  const initialHTML = ''; // 초기 HTML
  const subjectHTML = ''; // 초기 HTML
  const privewtHTML = ''; // 초기 HTML
  const initComment = '';

  const [title, setSubject] = useState(titletHTML);
  const [privew, setPrivew] = useState(privewtHTML);
  const [isLoginYn, setIsLogin] = useState(false);
  const [introText, setIntroText] = useState(initialHTML); // 에디터의 내용을 저장
  const [commentText, setcommentText] = useState(initComment); // 댓글입력
  const [commentData, setCommentData] = useState([]); // 댓글 데이터를 배열로 관리
  const [relationData, setRelationData] = useState([]); // 관련게시판 배열
  const [isEditing, setIsEditing] = useState(false); // 에디터의 가시성 상태를 저장
  

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
  const handleCommentTextChange = (e) =>{
    setcommentText(e.target.value);
  }
  const saveAfter= async() => {
    window.location.href ='/board/'+id; // 페이지 이동
  }
  // 저장처리
  const handleEditButtonClick = async () => {
    setIsEditing(!isEditing); // 편집 버튼 클릭 시 가시성 상태를 토글
    if (isEditing) {
        if(!isNaN(id)){
            await fileStatUpdate(id);
            const html = await upload01(introText, '', id); //html, board_type, board_id
            update01(title, html.replace(/'/g, "\\'"), privew, id); //작은따옴표의 경우 '\ 로 변경
          } else {
            const html = await upload01(introText, id,''); //html, board_type, board_id
            await save01(title, html.replace(/'/g, "\\'"), privew, id); //작은따옴표의 경우 '\ 로 변경
            await saveAfter();
          }
    }
  };
  const handleCommenButtonClick = async() => {
    if(isLoginYn){
      const result = await save02(id, commentText, '관리자');  
      if(!result){
        alert('작성가능한 댓글이 초과하였습니다. 추후 작업예정');
        return;
      }
    } else {
      const result = await save02(id, commentText, '손님');
      if(!result){
        alert('작성가능한 댓글이 초과하였습니다. 추후 작업예정');
        return;
      }
    }
    setcommentText('');
    window.location.reload();
  }; 

  // 처음 렌더링 시 Search01 함수 호출
  useEffect(() => {
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    setIsLogin(isLoggedIn === 'true');
    if(!isNaN(id)){ //작성된 글 읽기
      setTimeout(() => {
        Search01(id, isLoggedIn).then((data) => { //게시글조회
            setSubject(data[0].title);
            setIntroText(data[0].content);
            setPrivew(data[0].privew_content);
        });
        Search03(id).then((data) => {
          // 관련게시판
          const data2 = data.map((data2) => {
            return {
              title: data2.title,
              url: data2.url
            };
          });
          
          // 배열로 저장한 댓글 정보를 상태 변수로 설정
          setRelationData(data2);
        });
      }, 300);
      setTimeout(() => {
        Search02(id).then((data) => {
          // 모든 댓글 정보를 배열에 저장
          const comments = data.map((comment) => {
            return {
              user: comment.ins_user_id,
              content: comment.comment,
              date: comment.ins_ymdhms,
            };
          });
          
          // 배열로 저장한 댓글 정보를 상태 변수로 설정
          setCommentData(comments);
        });
      }, 300);
    } else { // 새글작성
      setIsEditing(true);
    }
  }, [id]); // 빈 배열을 전달하여 컴포넌트 마운트 시 한 번만 실행


  return (
    <div className={styles.container}>
      <Head>
        <title>LJC Developer Blog 인트로입니다.</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <div style={mainContent}>
        <Navigator />
        <div className={CommonStyle.board_content}>
          {isEditing ? (
            <textarea
              value={title}
              onChange={(e) => setSubject(e.target.value)}
              style={{ width: '50vw' }}
            />
          ) : (
            <div className={CommonStyle.board_subject}>
              <h1>{addLineBreaks(title)}</h1>
            </div>
          )}
          {isEditing && (
            <p className='.vw60'><textarea value={privew} 
            onChange={(e) => setPrivew(e.target.value)}
            style={{ width: '50vw' }}
            />
            </p>
             ) 
          }
          {isEditing ? (
            <ReactQuill value={introText} onChange={handleIntroTextChange} modules={modules} style={{ width: '50vw' }} />
          ) : (
            <p
              className="description"
              dangerouslySetInnerHTML={{ __html: introText }} />
          )}
           { isLoginYn && 
            <button className={CommonStyle.new_post_button} onClick={handleEditButtonClick}>
              {isEditing ? (!isNaN(id) ? '수정' : '저장') : '편집'}
            </button>
           }
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
export default BoardWrite;