import Head from 'next/head'
import styles from '../../styles/Home.module.css'
import {React, useState, useEffect, Fragment } from 'react';
import 'react-quill/dist/quill.snow.css'; // 에디터의 스타일을 불러옵니다.
import Header from './Header';
import Navigator from './Navigator';
import dynamic from 'next/dynamic';
import CommonStyle from '../../styles/common.module.css';
import {  Search01, save01, upload01, fileStatUpdate } from '../api/Intro_api';

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

function Intro() {
  const initialHTML = ''; // 초기 HTML
  const subjectHTML = ''; // 초기 HTML
  const [isEditing, setIsEditing] = useState(false); // 에디터의 가시성 상태를 저장
  const [introText, setIntroText] = useState(initialHTML); // 에디터의 내용을 저장
  const [isLoginYn, setIsLogin] = useState(false);
  const [subject, setSubject] = useState(subjectHTML);
  

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

  // 처음 렌더링 시 Search01 함수 호출
  useEffect(() => {
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    setIsLogin(isLoggedIn === 'true');
    setTimeout(() => {
      Search01().then((data) => {
        setSubject(data[0].subject);
        setIntroText(data[0].content);
      });
    }, 300);
  }, []); // 빈 배열을 전달하여 컴포넌트 마운트 시 한 번만 실행


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
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              style={{ width: '50vw' }}
            />
          ) : (
            <div className={CommonStyle.board_subject}>
              <h1>{addLineBreaks(subject)}</h1>
            </div>
          )}
          {isEditing ? (
            <ReactQuill value={introText} onChange={handleIntroTextChange} modules={modules} style={{ width: '50vw' }} />
          ) : (
            <p
              className="description"
              dangerouslySetInnerHTML={{ __html: introText }} />
          )}
           { isLoginYn && 
            <button className={CommonStyle.new_post_button} onClick={handleEditButtonClick}>
              {isEditing ? '저장' : '편집'}
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
export default Intro;