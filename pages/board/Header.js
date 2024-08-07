import React, {useState, useEffect} from 'react';
import headerStyles from'../../styles/header.module.css';
import { useRouter } from 'next/router';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons'; // 돋보기 아이콘 추가
import { faBars, faSun, faMoon } from '@fortawesome/free-solid-svg-icons';
import { login01, Search01 } from '../api/Header_api';
import Link from 'next/link';

function Header() {
  const [isModalOpen, setModalOpen] = useState(false); //로그인팝업
  const [password, setPassword] = useState(''); //패스워드
  const [isLoginYn, setIsLogin] = useState(false);//로그인여부
  const [isDarkMode, setIsDark] = useState(false);//다크모드여부
  const [isMenuOpen, setMenuOpen] = useState(false); //햄버거클릭여부
  const [boardList, setBoardListData] = useState([]); // 관련게시판 배열
  const [keyword, setKeyword] = useState(''); //검색키워드
  const router = useRouter();
  const currentPath = router.pathname;

  const openModal = () => {
    if (isLoginYn) {
      // 이미 로그인한 경우, 로그아웃 처리
      localStorage.removeItem(process.env.NEXT_PUBLIC_IS_LOGGED_IN);
      setIsLogin(false);
      window.location.reload();
    } else {
      setModalOpen(true);
    }
  };
  const KeywordSearch = () => {
    router.push(`/?keyword=${keyword}`);
  };

  const handleEnterKeyPress = (e) => {
    if (e.key === 'Enter') {
      if(currentPath === '/board/searchList'){
        router.replace(`/board/searchList2?keyword=${keyword}`);
      } else {
        router.replace(`/board/searchList?keyword=${keyword}`);
      }
    }
  };
  
  const LoginProc = () => {
    setIsLogin(true);
    closeModal();
    window.location.reload();
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleKeywordChange = (e) => {
    setKeyword(e.target.value);
  };


  const goToHomePage = () => {
    window.location.href = '/'; // 페이지 이동
  };
  const toggleMenu = () => {
    setMenuOpen(!isMenuOpen);
  };

  const toggleDarkMode = () => {
    if (!isDarkMode) {
      document.body.classList.add('dark-mode');
      localStorage.setItem('theme', 'dark');
    } else {
      document.body.classList.remove('dark-mode');
      localStorage.setItem('theme', 'light');
    }
    setIsDark(!isDarkMode);
  };

  const handleLogin = () => {
    login01(password).then((data) => {
      if (data.length > 0) {
        localStorage.setItem(process.env.NEXT_PUBLIC_IS_LOGGED_IN, 'true');
        alert('로그인 성공');
        LoginProc();
      } else {
        alert('패스워드가 틀립니다.');
      }
    });
  };

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
      setIsDark(true);
    }
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

  useEffect(() => {
    // 다크 모드 상태에 따라 body 클래스 변경
    if (isDarkMode) {
      document.body.classList.add('dark-mode');
      localStorage.setItem('theme', 'dark');
    } else {
      document.body.classList.remove('dark-mode');
      localStorage.setItem('theme', 'light');
    }
  }, [isDarkMode]);

  const headerClassName = isMenuOpen ? headerStyles.menu_open : headerStyles.header;


  useEffect(() => {
    // 컴포넌트가 처음 마운트될 때 로컬 세션을 확인하여 로그인 상태 업데이트
    const loginYn = localStorage.getItem(process.env.NEXT_PUBLIC_IS_LOGGED_IN);
    setIsLogin(loginYn === 'true');
  }, []);

  return (
    <header className={headerClassName}>
      <div style={{ display: "flex", alignItems: "center" }}>
        <span className={headerStyles.logo} onClick={goToHomePage}>LJC Developer Blog</span>
        <FontAwesomeIcon icon={faBars} onClick={toggleMenu} className={headerStyles.icon_small}/>
        <div className={headerStyles.search}>
          <input type="text" placeholder='검색어 입력' className={headerStyles.input} value={keyword} onChange={handleKeywordChange} onKeyPress={handleEnterKeyPress}></input>
          <FontAwesomeIcon icon={faSearch}  className={headerStyles.img} onClick={KeywordSearch}/>
        </div>
        <div>
          {isDarkMode ? (
              <FontAwesomeIcon icon={faMoon} onClick={toggleDarkMode} className={headerStyles.darkMode}  />
            ) : (
              <FontAwesomeIcon icon={faSun} onClick={toggleDarkMode} className={headerStyles.darkMode}  />
            )}
        </div>
        <div>
          {isLoginYn ? (
            <span className={headerStyles.account} onClick={openModal}>Admin</span>
          ) : (
            <span className={headerStyles.account} onClick={openModal}>일반용</span>
          )}
        </div>
      </div>

      <div className={headerStyles.menu_list}>
              <ul className={headerStyles.menu_item}>
                {boardList.map((data, index) => (
                    <li style={navItemStyle} key={index}>
                    <Link href={`${data.board_api}?board_type=${data.board_type}`}>{data.board_nm}</Link>
                    </li>
                ))}
              </ul>
      </div>

      {isModalOpen && (
        <div className={headerStyles.modal}>
          <div className={headerStyles.modal_content}>
            <h2>관리자 로그인</h2>
            <input type="password" placeholder="비밀번호를 입력해주세요." value={password} onChange={handlePasswordChange}/>
            <button onClick={handleLogin}>로그인</button>
            <button onClick={closeModal}>닫기</button>
          </div>
        </div>
      )}
    </header>
  );
};

const navItemStyle = {
  margin: '0.5rem 0',
  cursor: 'pointer',
  borderRadius: '5px',
  transition: 'background 0.3s ease',
  color: 'var(--nav-item-color, #070707)',
};


export default Header;