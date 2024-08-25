import {React, useState, useEffect, Fragment } from 'react';
import Head from 'next/head'
import styles from '../../styles/Home.module.css'
import 'react-quill/dist/quill.snow.css'; // 에디터의 스타일을 불러옵니다.
import Header from './Header';
import Footer from './Footer';
import dynamic from 'next/dynamic';
import CommonStyle from '../../styles/common.module.css';
import BoardWriteStyle from '../../styles/BoardWrite.module.css';
import Link from 'next/link';
import { save01, Search01, Search02, Search03, Search04, update01, upload01, fileStatUpdate, save02, ThumbnailUpload } from '../api/BoardWrite_api';
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
// <index1> 변환 >> <span id="textContent1">
function addLineIndex(text) {
  if(text !== null && text !== undefined){
     const replacedValue = text.replace(/&lt;index([1-8])&gt;/g, (_, index) => `<span id="textContent${index}">`)
                              .replace(/&lt;\/index[1-8]&gt;/g, '</span>');
    return replacedValue;
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
  const [ins_ymdhms, setDate] = useState('');
  const [isLoginYn, setIsLogin] = useState(false);
  const [introText, setIntroText] = useState(initialHTML); // 에디터의 내용을 저장
  const [commentName, setcommentName] = useState(initComment); // 댓글닉네임
  const [commentText, setcommentText] = useState(initComment); // 댓글입력
  const [commentData, setCommentData] = useState([]); // 댓글 데이터를 배열로 관리
  const [relationData, setRelationData] = useState([]); // 관련게시판 배열
  const [indexData, setIndexData] = useState([]); // 목차 배열
  const [isEditing, setIsEditing] = useState(false); // 에디터의 가시성 상태를 저장
  const [isLoading, setIsLoading] = useState(false); //로딩
  const [selectedImage, setSelectedImage] = useState(''); // 선택된 이미지 URL
  const [showImagePopup, setShowImagePopup] = useState(false); // 이미지 팝업 노출 여부
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 4; //페이징할 컨텐츠 개수
  
  

  //에디터 옵션
  const toolbarOptions = [
    [{ header: [1, 2, 3, 4, 5, 6, 7, false] }],
    ["bold", "italic", "underline", "strike"],
    ["blockquote"],
    [{ list: "ordered" }, { list: "bullet" }],
    [{ color: [] }, { background: [] }],
    [{ align: [] }],
    ['link'],
    ['image', 'gif'],
  ];
  const modules = {
    toolbar: {
      container: toolbarOptions,
    },
  };
  const handleIntroTextChange = (value) => {
    // const replacedValue = value.replace(/&lt;index([1-8])&gt;/g, (_, index) => `<span id="textContent${index}">`)
    //                          .replace(/&lt;\/index[1-8]&gt;/g, '</span>');
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
    const uniqueFileName = `blog_${timestamp}_img_upload`;
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
            const html = await upload01(addLineIndex(introText), '', id); //html, board_type, board_id
            update01(title, html.replace(/'/g, "\\'"), privew, id); //작은따옴표의 경우 '\ 로 변경
            setIsLoading(false);
          } else {
            const html = await upload01(addLineIndex(introText), id,''); //html, board_type, board_id
            if(html === undefined){
              await save01(title, html, privew, id); //작은따옴표의 경우 '\ 로 변경
            } else {
              await save01(title, html.replace(/'/g, "\\'"), privew, id); //작은따옴표의 경우 '\ 로 변경
            }
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
      const result = await save02(id, commentText, commentName);
      if(!result){
        alert('작성가능한 댓글이 초과하였습니다. 추후 작업예정');
        return;
      }
    }
    setcommentText('');
    setcommentName('');
    alert('소중한 댓글 감사합니다.');
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

  // 스크롤 제일아래로 이동
  const handleBottomMove = () => {
    window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
  };

  // 처음 렌더링 시 Search01 함수 호출
  useEffect(() => {
    const loginYn = localStorage.getItem(process.env.NEXT_PUBLIC_IS_LOGGED_IN);
    setIsLogin(loginYn);
    if(!isNaN(id)){ //작성된 글 읽기
        Search01(id, loginYn).then((data) => { //게시글조회
            setSubject(data[0].title);
            setIntroText(data[0].content);
            setPrivew(data[0].privew_content);
            setDate(data[0].ins_ymdhms);
        });
        Search03(id).then((data) => {
          // 관련게시판
          const data2 = data.map((data2) => {
            return {
              id: data2.id,
              title: data2.title,
              board_Type: data2.board_type,
              date: data2.ins_ymdhms,
              thumbnail_url: data2.thumbnail_url
            };
          });
          
          // 배열로 저장한 댓글 정보를 상태 변수로 설정
          setRelationData(data2);
        });
        Search04(id).then((data) => {
          // 관련게시판
          const data2 = data.map((data2) => {
            return {
              content: data2.h2_content,
              rownum: data2.rownum
            };
          });
          
          // 배열로 저장한 댓글 정보를 상태 변수로 설정
          setIndexData(data2);
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
    // 카카오애드핏 스크립트 및 광고 요소 추가
    // const addKakaoAdfit = () => {
    //   let ins = document.createElement('ins');
    //   let scr = document.createElement('script');
    
    //   ins.className = 'kakao_ad_area';
    //   ins.style.display = 'block'; // visible block
    //   ins.style.position = 'fixed'; // fix to bottom
    //   ins.style.bottom = '0'; // align to bottom
    //   ins.style.right = '0';
    //   ins.style.width = '100%'; // full width
    //   ins.style.height = '90px'; // height 90px
    //   ins.style.zIndex = '1000'; // ensure it's above other elements
    //   scr.async = true;
    //   scr.type = 'text/javascript';
    //   scr.src = '//t1.daumcdn.net/kas/static/ba.min.js';
    //   if (window.innerWidth > 768) {
    //     ins.setAttribute('data-ad-width', '250');
    //     ins.setAttribute('data-ad-height', '250');
    //     ins.setAttribute('data-ad-unit', 'DAN-lb8dg1wjZrXafQJz');
    //   }
    
    //   document.querySelector('.adfit').appendChild(ins);
    //   document.querySelector('.adfit').appendChild(scr);
    // };

    //addKakaoAdfit(); // 함수 실행
  }, [id]); // 빈 배열을 전달하여 컴포넌트 마운트 시 한 번만 실행

  //페이징 처리
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = relationData.slice(indexOfFirstPost, indexOfLastPost);
  const paginate = (pageNumber) => setCurrentPage(pageNumber);


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
      <div id="wrapper" className="fade-in">
        <Header />
    
        <div id="main">
         <article className="post featured">
          <header className="major">
            <span className="date">{ins_ymdhms}</span>
            {isEditing ? (
              <textarea
                className={BoardWriteStyle.board_textarea}
                value={title}
                placeholder='제목을 입력해주세요.'
                onChange={(e) => setSubject(e.target.value)}
              />
            ) : (
              <div>
                <iframe src="https://ads-partners.coupang.com/widgets.html?id=796054&template=carousel&trackingCode=AF0780791&subId=&width=800&height=200&tsource=" width="800" height="200" frameborder="0" scrolling="no" referrerpolicy="unsafe-url" browsingtopics></iframe>

                <h1>{addLineBreaks(title)}</h1><hr></hr>
              </div>
            )}
            {isEditing && (
              <p className='.vw60'>
                <input type='file' name='images' onChange={onSelectFile} accept='.png, .jpg,image/*'/>
              </p>
              ) 
            }
          </header>
            {isEditing && (
              <p className='.vw60'>
                <textarea 
                className={BoardWriteStyle.board_textarea}
                placeholder='description 을 입력해주세요.'
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
                style={{fontFamily:'Pretendard'}}
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
                  <div className={CommonStyle.loading_overlay}>
                    <img src="/image/loading.gif" alt="Loading" className={CommonStyle.loading_spinner}/>
                  </div>
                ) : (
                  isLoginYn && 
                  <button onClick={handleEditButtonClick}>
                    {isEditing ? (!isNaN(id) ? '수정' : '저장') : '편집'}
                  </button>
                  
                )
            }

          {/* 목차 */}
          <div className={BoardWriteStyle.relation_form}>
              <h5>목차</h5>
              <a href="#"><h5 className={CommonStyle.cursor}>스크롤 ▲</h5></a>
              {indexData.length > 0 ? (
              <ul style={{marginLeft:40}}>
              {indexData.map((data, index) => (
                  <li className={BoardWriteStyle.relation_li} key={index}>
                    <a href={"#textContent" + data.rownum}>
                        {data.content}
                    </a>
                  </li>
              ))}
              </ul>
              ) : (
              <p>관련 게시물이 없습니다.</p>
              )}
              <a href="#" onClick={handleBottomMove}><h5 className={CommonStyle.cursor}>스크롤 ▼</h5></a>
              <div className="adfit"/>
              <div>
              <iframe src="https://ads-partners.coupang.com/widgets.html?id=796054&template=carousel&trackingCode=AF0780791&subId=&width=160&height=500&tsource=" width="160" height="500" frameborder="0" scrolling="no" referrerpolicy="unsafe-url" browsingtopics></iframe>
              </div>
          </div>
          </article>
          {/* 댓글작성 */}
        { !isNaN(id) &&
          <div>
            <h2>Form</h2>
            <form method="post" action="#">
              <div class="row gtr-uniform">
                <div class="col-6 col-12-xsmall">
                  <input type="text" name="demo-name" id="demo-name" placeholder="Name"  onChange={(e) => setcommentName(e.target.value)}/>
                </div>
                
                <div class="col-12">
                  <textarea name="demo-message" id="demo-message" placeholder="Enter your message" rows="6" onChange={handleCommentTextChange}></textarea>
                </div>

                <div class="col-12">
                  <ul class="actions">
                    <li><button onClick={handleCommenButtonClick}>send Message</button></li>
                    <li><input type="reset" value="Reset" /></li>
                  </ul>
                </div>
              </div>
            </form>
            <hr/>
            <h3>Comment</h3>
            <div class="table-wrapper">
            <table>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>comment</th>
                  <th>date</th>
                </tr>
              </thead>
              <tbody>
              {commentData.map((comment, index) => (
                <tr key={index}>
                  <td style={{fontFamily:'Pretendard'}}>{comment.user}</td>
                  <td style={{fontFamily:'Pretendard'}}>{comment.content}</td>
                  <td style={{fontFamily:'Pretendard'}}>{comment.date}</td>
                </tr>
              ))}
              </tbody>
              </table>
              </div>
            </div>
        }
          
          {/* 관련게시판 */}
        {
          <section className="posts">
            {currentPosts.map((post) => (
                  <article key={post.id}>
                    <header>
                      <span className="date">{post.date}</span>
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
        }
         <footer>
              <div className="pagination">
                <a className={`previous ${currentPage === 1 ? 'disabled' : ''}`}
                  onClick={() => currentPage > 1 && paginate(currentPage - 1)}>
                  Prev
                </a>
                {[...Array(Math.ceil(relationData.length / postsPerPage)).keys()].map((number) => (
                  <a key={number + 1} className={`page ${currentPage === number + 1 ? 'active' : ''}`}
                    onClick={() => paginate(number + 1)}>
                    {number + 1}
                  </a>
                ))}
                <a className={`next ${currentPage === Math.ceil(relationData.length / postsPerPage) ? 'disabled' : ''}`}
                  onClick={() => currentPage < Math.ceil(relationData.length / postsPerPage) && paginate(currentPage + 1)}>
                  Next
                </a>
              </div>
          </footer>
        </div>

        <Footer/>
        <div className="daum-wm-content" style={{position: 'absolute', width: '1px', height: '1px', overflow: 'hidden', clip: 'rect(1px, 1px, 1px, 1px)', whiteSpace: 'nowrap'}}>{seo_privew}</div>
        </div>
      </div>
  );
}

export async function getServerSideProps(context) {
  const { id } = context.query;
  let seo_title = 'LJC Developer Blog';
  let seo_privew = 'LJC Developer Blog';
  let seo_Thumbnail = 'https://develop-blog.pe.kr/profile.webp';
  try {
    if (!isNaN(id)) {
      const data = await Search01(id, 'Admin'); //게시글조회
      if (data) {
        seo_title = data[0].title;
        seo_privew = data[0].privew_content;
        seo_Thumbnail = data[0].thumbnail_url;
        return {
          props: {
            seo_title,
            seo_privew,
            seo_Thumbnail,
          },
        };
      }
    }
  } catch(error){
    console.error("Error fetching data:");
    return {
      props: {
        seo_title,
        seo_privew,
        seo_Thumbnail,
      },
    };
  }

  return {
    props: {
      seo_title,
      seo_privew,
      seo_Thumbnail,
    },
  };
}


export default BoardWrite;