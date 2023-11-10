import React, {useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import NavigatorStyle from '../../styles/Navigator.module.css';
import { Search01 } from '../api/Navigator_api';

function Navigator() {
  const router = useRouter();
  const [boardList, setBoardListData] = useState([]); // 관련게시판 배열

  const handleNavigation = (path) => {
    router.push(path);
  };

  useEffect(() => {
      Search01().then((data) => {
        const data2 = data.map((data2) => {
          return {
            board_type: data2.board_type,
            board_api: data2.board_api,
            order_no: data2.order_no,
            board_nm: data2.board_nm
          };
        });
        setBoardListData(data2);
      });
  }, []); // 빈 배열을 전달하여 컴포넌트 마운트 시 한 번만 실행

  return (
    <nav className={NavigatorStyle.left_nav}>
      <ul style={navListStyle}>
        <li>
          <img src="/profile.JPG" alt="프로필 사진" className={NavigatorStyle.profile_img} />
        </li>
        {boardList.map((data, index) => (
            <li style={navItemStyle} key={index} ><a href={`${data.board_api}?board_type=${data.board_type}`}>{data.board_nm}</a></li>
        ))}
      </ul>
    </nav>
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