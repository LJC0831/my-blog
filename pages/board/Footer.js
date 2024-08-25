import React, {useState, useEffect } from 'react';
import headerStyles from'../../styles/header.module.css';
import { login01 } from '../api/Header_api';
const Footer = () => {
  const [isModalOpen, setModalOpen] = useState(false); //로그인팝업
  const [password, setPassword] = useState(''); //패스워드
  const [isLoginYn, setIsLogin] = useState(false);//로그인여부

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

  const closeModal = () => {
    setModalOpen(false);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
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
  const LoginProc = () => {
    setIsLogin(true);
    closeModal();
    window.location.reload();
  };


  useEffect(() => {
        // 컴포넌트가 처음 마운트될 때 로컬 세션을 확인하여 로그인 상태 업데이트
        const loginYn = localStorage.getItem(process.env.NEXT_PUBLIC_IS_LOGGED_IN);
        setIsLogin(loginYn === 'true');
    }, []);
  return (
    <div>
      {/* <footer id="footer">
            <section>
                <form method="post" action="#">
                    <div className="fields">
                        <div className="field">
                            <label htmlFor="name">Name</label>
                            <input type="text" name="name" id="name" />
                        </div>
                        <div className="field">
                            <label htmlFor="email">Email</label>
                            <input type="text" name="email" id="email" />
                        </div>
                        <div className="field">
                            <label htmlFor="message">Message</label>
                            <textarea name="message" id="message" rows="3"></textarea>
                        </div>
                    </div>
                    <ul className="actions">
                        <li><input type="submit" value="Send Message" /></li>
                    </ul>
                </form>
            </section>
            <section className="split contact">
                <section className="alt">
                    <h3>Address</h3>
                    <p>1234 Somewhere Road #87257<br />
                    Nashville, TN 00000-0000</p>
                </section>
                <section>
                    <h3>Phone</h3>
                    <p><a href="#">(000) 000-0000</a></p>
                </section>
                <section>
                    <h3>Email</h3>
                    <p><a href="#">leejc831@naver.com</a></p>
                </section>
                <section>
                    <h3>Social</h3>
                    <ul className="icons alt">
                        <li><a href="https://github.com/LJC0831" className="icon brands alt fa-github"><span className="label">GitHub</span></a></li>
                    </ul>
                </section>
              </section>
         </footer> */}
          <div id="copyright">
              <ul>
                  <li><span>만든이 : LEE JAE CHUN</span></li>
                  <li>&copy; Untitled</li><li>Design: <a href="https://html5up.net">HTML5 UP</a></li>
                  <li>
                    {isLoginYn ? (
                        <span onClick={openModal}>로그아웃</span>
                    ) : (
                        <span onClick={openModal}>로그인</span>
                    )}
                  </li>
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
    </div>
    
  );
};

export default Footer;