import {React, useEffect, useState} from 'react';
import { Search01 } from '../api/Header_api';
import Link from 'next/link';
import { useRouter } from 'next/router';

function Main() {
  const [boardList, setBoardListData] = useState([]); // 관련게시판 배열
	const [isPanelOpen, setIsPanelOpen] = useState(false); // 패널 열림 상태
	const [selectedIndex, setSelectedIndex] = useState(null); // 선택된 li 인덱스
  const [searchKeyword, setSearchKeyword] = useState('');//검색
	const router = useRouter();

	const toggleNavPanel = () => {
		setIsPanelOpen(!isPanelOpen); // 패널 열림/닫힘 상태 토글
	  };
	const handleItemClick = (index) => {
		setSelectedIndex(index); // 선택된 li 인덱스를 업데이트
	};
  const handleSearchKeyword = () =>{
    router.push(`/board/searchList?keyword=${searchKeyword}`);
  };
  const handleEnterKeyPress = (e) => {
    if (e.key === 'Enter') {
      router.push(`/board/searchList?keyword=${searchKeyword}`);
    }
  };

	useEffect(() => {
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

	useEffect(() => {
		// 현재 URL에 맞게 active 상태 초기화
		boardList.forEach((data, index) => {
		  if (router.asPath.includes(data.board_type)) {
			setSelectedIndex(index);
		  }
		});
	  }, [router.asPath, boardList]);

  return (
    <div>
        <div id="intro">
          <h1>LJC Developer Blog</h1>
          <p>This blog is a personal website created with Next.js + node.js. The design is referenced from <a href="https://html5up.net">HTML5 UP</a></p>
          <div className="searchKeyword">
            <input type="text" style={{height:"7vh"}} placeholder="Search..." value={searchKeyword} onChange={(e) => setSearchKeyword(e.target.value)} onKeyPress={handleEnterKeyPress}/>
            <button onClick={handleSearchKeyword} style={{height:"7vh"}}>검색</button>
          </div>
        </div>

        <nav id="nav">
          <ul className="links">
            {boardList.map((data, index) => (
                <li key={index} className={selectedIndex === index ? 'active' : ''} onClick={() => handleItemClick(index)}>
                <Link href={`${data.board_api}?board_type=${data.board_type}`}>{data.board_nm}</Link>
              </li>
            ))}
          </ul>
          <ul className="icons">
            <li><a href="https://github.com/LJC0831" className="icon brands fa-github"><span className="label">GitHub</span></a></li>
          </ul>
        </nav>

        <a id="navPanelToggle" onClick={toggleNavPanel}>Menu</a>
        {/* 모바일 화면에서 패널 열림 상태에 따른 목록 표시 */}
        {isPanelOpen && (
          <div id="mobilePanel">
            <ul className="mobile-board-list">
            {boardList.map((data, index) => (
              <li key={index}>
                <Link href={`${data.board_api}?board_type=${data.board_type}`}>{data.board_nm}</Link>
              </li>
            ))}
            </ul>
          </div>
          )}
        </div>
  );
}


export default Main;