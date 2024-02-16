import Head from 'next/head'
import styles from '../../styles/Home.module.css'
import {React, useState, useEffect, Fragment } from 'react';
import 'react-quill/dist/quill.snow.css'; // 에디터의 스타일을 불러옵니다.
import Header from './Header';
import Navigator from './Navigator';
import dynamic from 'next/dynamic';
import CommonStyle from '../../styles/common.module.css';
import BoardWriteStyle from '../../styles/BoardWrite.module.css';
import { save01, Search01, Search02, Search03, update01, upload01, fileStatUpdate, save02, ThumbnailUpload } from '../api/BoardWrite_api';
import { useRouter } from 'next/router';



// 줄바꿈 문자를 <br> 태그로 변환하는 함수
function addLineBreaks(text) {
  if(text !== null && text !== undefined){
    const withBreaks = text.split('\n').map((line, index) => (
      <Fragment key={index}>
        {line}
        <br />
      </Fragment>
    ));
    return withBreaks;
  }
}

const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });

function BoardWrite({seo_title, seo_privew, seo_Thumbnail}) {
  const router = useRouter();
  const { id } = router.query; //게시글번호
  const initialHTML = ''; // 초기 HTML
  const initComment = '';

  const [title, setSubject] = useState('');
  const [privew, setPrivew] = useState('');
  const [isLoginYn, setIsLogin] = useState(false);
  const [introText, setIntroText] = useState(initialHTML); // 에디터의 내용을 저장
  const [commentText, setcommentText] = useState(initComment); // 댓글입력
  const [commentData, setCommentData] = useState([]); // 댓글 데이터를 배열로 관리
  const [relationData, setRelationData] = useState([]); // 관련게시판 배열
  const [isEditing, setIsEditing] = useState(false); // 에디터의 가시성 상태를 저장
  const [isLoading, setIsLoading] = useState(false); //로딩
  const [selectedImage, setSelectedImage] = useState(''); // 선택된 이미지 URL
  const [showImagePopup, setShowImagePopup] = useState(false); // 이미지 팝업 노출 여부
  const [currentTime, setCurrentTime] = useState(new Date()); //서버시간

  const koreanTime = currentTime.toLocaleTimeString('en-US', { timeZone: 'Asia/Seoul' });
  const [hours, minutes] = koreanTime.split(':').map(Number);
  const isServerDownTime = hours >= 3 && hours < 8 && minutes >= 0 && minutes <= 30;
  

  //에디터 옵션
  const toolbarOptions = [
    [{ header: [1, 2, 3, 4, 5, 6, false] }],
    ["bold", "italic", "underline", "strike"],
    ["blockquote"],
    [{ list: "ordered" }, { list: "bullet" }],
    [{ color: [] }, { background: [] }],
    [{ align: [] }],
    ['link'],
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
    window.location.href ='/board/BoardList?board_type='+id; // 페이지 이동
  }
  //대표이미지 업로드
  const onSelectFile = (e) =>{
    const file = e.target.files[0];
    const formData = new FormData();
    const timestamp = Date.now();
    const uniqueFileName = `${timestamp}_img_upload`;
    formData.append('file', file);
    formData.append('fileName', uniqueFileName);
    formData.append('id', id);
    ThumbnailUpload(formData);
  }
  // 저장처리
  const handleEditButtonClick = async () => {
    setIsLoading(true); // Set loading state to true
    setIsEditing(!isEditing); // 편집 버튼 클릭 시 가시성 상태를 토글
    if (isEditing) {
        if(!isNaN(id)){
            await fileStatUpdate(id);
            const html = await upload01(introText, '', id); //html, board_type, board_id
            update01(title, html.replace(/'/g, "\\'"), privew, id); //작은따옴표의 경우 '\ 로 변경
            setIsLoading(false);
          } else {
            const html = await upload01(introText, id,''); //html, board_type, board_id
            await save01(title, html.replace(/'/g, "\\'"), privew, id); //작은따옴표의 경우 '\ 로 변경
            await saveAfter();
            setIsLoading(false);
          }
    } else {
      setIsLoading(false);
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

  //이미지 팝업
  const openImagePopup = (imageUrl) => {
    setSelectedImage(imageUrl);
    setShowImagePopup(true);
  };

  const closeImagePopup = () => {
    setSelectedImage('');
    setShowImagePopup(false);
  };
  const handleImageClick = (event) => {
    const images = document.querySelectorAll('.description img');
    images.forEach((img) => {
      img.addEventListener('click', () => openImagePopup(img.src));
    });
  };

  // 처음 렌더링 시 Search01 함수 호출
  useEffect(() => {
    setCurrentTime(new Date());
    if(isServerDownTime){
      alert('서버Down 상태입니다.. 오전 9시 서버부팅 됩니다.');
    }
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    setIsLogin(isLoggedIn);
    if(!isNaN(id)){ //작성된 글 읽기
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
    } 
    handleImageClick(); 
  }, [id]); // 빈 배열을 전달하여 컴포넌트 마운트 시 한 번만 실행


  return (
    <div className={styles.container}>
      <Head>
        <title>{seo_title}</title>
        <meta name="description" content={seo_privew} />
        <link rel="icon" href="/favicon.ico" />
        {/* 오픈그래프 */}
        <meta property="og:type" content="website"/> 
        <meta property="og:title" content={seo_title}/>
        <meta property="og:description" content={seo_privew}/>
        <meta property="og:image" content={seo_Thumbnail}></meta>
    
      </Head>
      <Header />
      <div style={mainContent}>
        <Navigator />
        <div className={CommonStyle.board_content}>
          <h1 className={styles.title}>
              {isServerDownTime && '오전 03:00 ~ 08:30 서버Down...'}
          </h1>
          {isEditing ? (
            <textarea
              className={BoardWriteStyle.board_textarea}
              value={title}
              onChange={(e) => setSubject(e.target.value)}
            />
          ) : (
            <div className={CommonStyle.board_subject}>
              <h1>{addLineBreaks(title)}</h1>
            </div>
          )}
          {isEditing && (
            <p className='.vw60'>
              <input type='file' name='images' onChange={onSelectFile} accept='.png, .jpg,image/*'/>
            </p>
             ) 
          }
          {isEditing && (
            <p className='.vw60'>
              <textarea 
              className={BoardWriteStyle.board_textarea}
              value={privew} 
              onChange={(e) => setPrivew(e.target.value)}
            />
            </p>
             ) 
          }
          {/* 팝업 */}
          {showImagePopup && (
              <div className={BoardWriteStyle.image_popup}>
                <img src={selectedImage} alt="Popup" onClick={closeImagePopup} />
                <button className={CommonStyle.new_post_button} onClick={closeImagePopup}>Close</button>
              </div>
          )}
          {isEditing ? (
            <ReactQuill value={introText} onChange={handleIntroTextChange} modules={modules} className={BoardWriteStyle.board_textarea} />
          ) : (
            <p
              className="description"
              dangerouslySetInnerHTML={{ __html: introText }}
                ref={(el) => {
                  if (el) {
                    el.addEventListener('click', (event) => {
                      if (event.target.tagName === 'IMG') {
                        openImagePopup(event.target.src);
                      }
                    });
                  }
                }}
              />
          )}
           { isLoginYn && 
              isLoading ? (
                <p>Loading...</p>
              ) : (
                isLoginYn && 
                <button className={CommonStyle.new_post_button} onClick={handleEditButtonClick}>
                  {isEditing ? (!isNaN(id) ? '수정' : '저장') : '편집'}
                </button>
                
              )
           }
           { !isNaN(id) &&
            <div className={BoardWriteStyle.comment_section} >
                <h2>댓글</h2>
                <div className={BoardWriteStyle.comment_list}>
                {commentData.map((comment, index) => (
                    <p className={CommonStyle.vw60} key={index}><span className={BoardWriteStyle.comment_user}>{comment.user}</span> 
                    <span className={BoardWriteStyle.comment_txt}>{comment.content}</span>
                    <span className={BoardWriteStyle.comment_time}>작성시간: {comment.date}</span></p>
                ))}
                </div>

                <div className={BoardWriteStyle.comment_form}>
                    <textarea value={commentText} onChange={handleCommentTextChange} className={BoardWriteStyle.comment_textarea} placeholder="댓글을 작성하세요"/>
                    <button className={CommonStyle.new_post_button} onClick={handleCommenButtonClick}>댓글 작성</button>
                </div>
            </div>
            }
        </div>
        {/* 관련게시판 */}
        <div className={BoardWriteStyle.relation_form}>
            <h5>관련게시물</h5>
            {relationData.length > 0 ? (
            <ul>
            {relationData.map((data, index) => (
                <li className={BoardWriteStyle.relation_li} key={index}><a href={data.url}>{data.title}</a></li>
            ))}
            </ul>
            ) : (
            <p>관련 게시물이 없습니다.</p>
            )}
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

export async function getServerSideProps() {
  // 서버 측에서 데이터를 가져오는 로직
  const seo_title = 'This is some server-rendered data.';
  const seo_privew = 'This is some server-rendered data.';
  const seo_Thumbnail = 'This is some server-rendered data.';
  
  return {
    props: {
      seo_title,
      seo_privew,
      seo_Thumbnail,
    },
  };
}

// export async function getServerSideProps(context) {
//   const { id } = context.query;
//   let seo_title = 'LJC Developer Blog';
//   let seo_privew = 'LJC Developer Blog';
//   let seo_Thumbnail = 'https://www.develop-blog.shop/profile.JPG';
//   try {
//     if (!isNaN(id)) {
//       const data = await Search01(id, 'Admin'); //게시글조회
//       if (data) {
//         seo_title = data[0].title;
//         seo_privew = data[0].privew_content;
//         seo_Thumbnail = data[0].thumbnail_url;
//         return {
//           props: {
//             seo_title,
//             seo_privew,
//             seo_Thumbnail,
//           },
//         };
//       }
//     }
//   } catch(error){
//     return {
//       props: {
//         seo_title,
//         seo_privew,
//         seo_Thumbnail,
//       },
//     };
//   }

//   return {
//     props: {
//       seo_title,
//       seo_privew,
//       seo_Thumbnail,
//     },
//   };
// }


export default BoardWrite;