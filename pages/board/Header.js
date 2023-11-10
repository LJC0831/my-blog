import React, {useState, useEffect} from 'react';
import headerStyles from'../../styles/header.module.css';
import { login01 } from '../api/Header_api';

function Header() {
  const [isModalOpen, setModalOpen] = useState(false); //로그인팝업
  const [password, setPassword] = useState(''); //패스워드
  const [isLoginYn, setIsLogin] = useState(false);//로그인여부

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
          <span className={headerStyles.logo} onClick={goToHomePage}>LJC Developer Blog</span>
        {isLoginYn ? (
            <span className={headerStyles.account} onClick={openModal}>Admin</span>
          ) : (
            <span className={headerStyles.account} onClick={openModal}>일반용</span>
          )}
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