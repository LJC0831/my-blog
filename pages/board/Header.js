import React, {useState, useEffect} from 'react';
import headerStyles from'../../styles/header.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { login01 } from '../api/Header_api';

function Header() {
  const [isModalOpen, setModalOpen] = useState(false); //로그인팝업
  const [password, setPassword] = useState(''); //패스워드
  const [isLoginYn, setIsLogin] = useState(false);//로그인여부
  const [isMenuOpen, setMenuOpen] = useState(false); //햄버거클릭여부

  const openModal = () => {
    if (isLoginYn) {
      // 이미 로그인한 경우, 로그아웃 처리
      localStorage.removeItem('isLoggedIn');
      setIsLogin(false);
      window.location.reload();
    } else {
      setModalOpen(true);
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

  const goToHomePage = () => {
    window.location.href = '/'; // 페이지 이동
  };
  const toggleMenu = () => {
    setMenuOpen(!isMenuOpen);
  };

  const handleLogin = () => {
    login01(password).then((data) => {
      if (data.length > 0) {
        localStorage.setItem('isLoggedIn', 'true');
        alert('로그인 성공');
        LoginProc();
      } else {
        alert('패스워드가 틀립니다.');
      }
    });
  };

  useEffect(() => {
    // 컴포넌트가 처음 마운트될 때 로컬 세션을 확인하여 로그인 상태 업데이트
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    setIsLogin(isLoggedIn === 'true');
  }, []);

  return (
    <header className={headerStyles.header}>
      <div>
      <FontAwesomeIcon icon={faBars} onClick={toggleMenu} className={headerStyles.icon_small}/>
          <span className={headerStyles.logo} onClick={goToHomePage}>LJC Developer Blog</span>
        {isLoginYn ? (
            <span className={headerStyles.account} onClick={openModal}>Admin</span>
          ) : (
            <span className={headerStyles.account} onClick={openModal}>일반용</span>
          )}
      </div>

      <div className={headerStyles.menu_list}>
        <ul>
        <li className={headerStyles.li_parent}>
            프론트엔드
              <ul className={headerStyles.li_submenu}>
                <li className='li-sub'><a href="/board/vue">vue.js</a></li>
                <li className='li-sub'><a href="/board/react">react.js</a></li>
              </ul>
        </li>
        <li className={headerStyles.li_parent}>
            백엔드
              <ul className={headerStyles.li_submenu}>
                <li className={headerStyles.li_sub}><a href="/board/nodejs">node.js</a></li>
              </ul>
          </li>
          <li className={headerStyles.li_parent} >
            DB
              <ul className={headerStyles.li_submenu}>
                <li className={headerStyles.li_sub}><a href="/board/mariadb">MariaDB</a></li>
              </ul>
          </li>
        <li className={headerStyles.li_parent} ><a href="/board/etc">기타작업</a></li>
        </ul>
      </div>

      {isModalOpen && (
        <div className={headerStyles.modal}>
          <div className={headerStyles.modal_content}>
            <h2>관리자 로그인</h2>
            <input type="password" placeholder="비밀번호를 입력해주세요." value={password} onChange={handlePasswordChange} />
            <button onClick={handleLogin}>로그인</button>
            <button onClick={closeModal}>닫기</button>
          </div>
        </div>
      )}
    </header>
  );
};


export default Header;