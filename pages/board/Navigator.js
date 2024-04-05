import React, {useEffect, useState } from 'react';
import NavigatorStyle from '../../styles/Navigator.module.css';
import { Search01 } from '../api/Navigator_api';
import Link from 'next/link';

function Navigator() {
  const [boardList, setBoardListData] = useState([]); // 관련게시판 배열

  useEffect(() => {
      Search01().then((data) => {
        try{
        const data2 = data.map((data2) => {
          return {
            board_type: data2.board_type,
            board_api: data2.board_api,
            order_no: data2.order_no,
            board_nm: data2.board_nm
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
        <li>
          <img src="https://develop-blog.shop/profile.JPG" alt="프로필 사진" className={NavigatorStyle.profile_img} />
        </li>
        {boardList.map((data, index) => (
            <li style={navItemStyle} key={index}>
             <Link href={`${data.board_api}?board_type=${data.board_type}`}>{data.board_nm}</Link>
            </li>
        ))}
      </ul>
    </nav>
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