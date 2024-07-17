import React, {useEffect, useState } from 'react';
import NavigatorStyle from '../../styles/Navigator.module.css';
import { Search01 } from '../api/Navigator_api';
import Link from 'next/link';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faCode, faExclamationCircle, faEllipsisH } from "@fortawesome/free-solid-svg-icons";

function Navigator() {
  const [boardList, setBoardListData] = useState([]); // 관련게시판 배열

  const getIcon = (boardIcon) => {
    switch (boardIcon) {
      case 'faUser':
        return faUser; //내정보 아이콘
      case 'faCode':
        return faCode; //소스코드 아이콘
      case 'faExclamationCircle':
        return faExclamationCircle; //에러아이콘
      case 'faEllipsisH':
        return faEllipsisH; //에러아이콘
    }
  };

  useEffect(() => {
        // 카카오애드핏 스크립트 및 광고 요소 추가
        const addKakaoAdfit = () => {
          let ins = document.createElement('ins');
          let scr = document.createElement('script');
        
          ins.className = 'kakao_ad_area';
          ins.style.display = 'none';
          scr.async = true;
          scr.type = 'text/javascript';
          scr.src = '//t1.daumcdn.net/kas/static/ba.min.js';
          if (window.innerWidth > 768) {
            ins.setAttribute('data-ad-width', '160');
            ins.setAttribute('data-ad-height', '600');
            ins.setAttribute('data-ad-unit', 'DAN-2hGEktHnZg2ofBMF');
          }
        
          document.querySelector('.adfit').appendChild(ins);
          document.querySelector('.adfit').appendChild(scr);
        };
    
        addKakaoAdfit(); // 함수 실행

      Search01().then((data) => {
        try{
        const data2 = data.map((data2) => {
          return {
            board_type: data2.board_type,
            board_api: data2.board_api,
            order_no: data2.order_no,
            board_nm: data2.board_nm,
            board_icon: data2.board_icon
          };
        });
        setBoardListData(data2);
        } catch{
          console.log("Navigator Search01 오류발생")
        }
      });
  }, []); // 빈 배열을 전달하여 컴포넌트 마운트 시 한 번만 실행

  return (
    <section className={NavigatorStyle.sidebar}>
    <nav className={NavigatorStyle.left_nav}>
      <ul style={navListStyle}>
        {boardList.map((data, index) => (
            <li style={navItemStyle} key={index}>
             <FontAwesomeIcon icon={getIcon(data.board_icon)} />&nbsp;&nbsp;
             <Link href={`${data.board_api}?board_type=${data.board_type}`}>{data.board_nm}</Link>
            </li>
        ))}
      </ul>
      
    </nav>
    <div className="adfit"/>
    </section>
  );
};



const navListStyle = {
  listStyle: 'none',
  padding: 0,
};

const navItemStyle = {
  margin: '0.5rem 0',
  cursor: 'pointer',
  padding: '0.5rem',
  borderRadius: '5px',
  transition: 'background 0.3s ease',
};



export default Navigator;