import {React, useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'; // 에디터의 스타일을 불러옵니다.

const Intro = () => {
  const initialHTML = ''; // 초기 HTML
  const [isEditing, setIsEditing] = useState(false); // 에디터의 가시성 상태를 저장
  const [introText, setIntroText] = useState(initialHTML); // 에디터의 내용을 저장
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
  const handleEditButtonClick = async() => {
    setIsEditing(!isEditing); // 편집 버튼 클릭 시 가시성 상태를 토글
    if (isEditing) {
      await fileStatUpdate();
      const html = await upload01(introText, 'intro',''); //html, board_type, board_id
      save01(subject, html);
    }
  };
  return (
    <div>
      <h1>Welcome to the Introduction</h1>
      {isEditing ? (
      <ReactQuill value={introText} onChange={handleIntroTextChange} modules={modules} style={{ width: '50vw' }} />
        ) : (
            <p
              className="description"
              dangerouslySetInnerHTML={{ __html: introText }}/>
      )}
      <button className='new-post-button' onClick={handleEditButtonClick}>
      {isEditing ? '저장' : '편집'}
      </button>
    </div>
  );
};

export default Intro;