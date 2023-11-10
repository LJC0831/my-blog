
import api from '../api/api';
import {exchangeString01 } from './api';

// 게시글작성
export async function save01(title, content, privew, board_type) {
    try {
      const response = await fetch(`${api}/api/blog/BoardInsert`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({title, content, privew, board_type}),
      });
      if (response.ok) {
        // 성공적으로 저장됨
        console.log('내용이 성공적으로 저장되었습니다.');
      } else {
        // 저장 실패
        console.error('BoardInsert 내용 저장에 실패했습니다.');
      }
    } catch (error) {
      console.error('BoardInsert 내용 저장에 실패했습니다.', error);
    }
  }
  // 댓글작성
export async function save02(id, commentData, ins_user_id) {
    try {
      commentData = exchangeString01(commentData);
      const response = await fetch(`${api}/api/blog/BoardInsert2`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({id, commentData, ins_user_id}),
      });
      if (response.ok) {
        // 성공적으로 저장됨
        console.log('내용이 성공적으로 저장되었습니다.');
        return true;
      } else {
        // 저장 실패
        console.error('BoardInsert 내용 저장에 실패했습니다.');
        return false;
      }
    } catch (error) {
      console.error('BoardInsert 내용 저장에 실패했습니다.', error);
      return false;
    }
  }

  export async function update01(title, content, privew, id) {
    try {
      const response = await fetch(`${api}/api/blog/BoardUpdate`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({title, content, privew, id }),
      });
      if (response.ok) {
        // 성공적으로 저장됨
        console.log('내용이 성공적으로 저장되었습니다.');
      } else {
        // 저장 실패
        console.error('BoardUpdate 내용 저장에 실패했습니다.');
      }
    } catch (error) {
      console.error('BoardUpdate 내용 저장에 실패했습니다.', error);
    }
  }

export async function Search01(board_id, isLoggedIn) {
    try {
        const response = await fetch(`${api}/api/blog/BoardSearch`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({board_id, isLoggedIn}),
        });
        if (response.ok) {
          // 성공적으로 저장됨
          const data = await response.json(); // JSON 데이터를 파싱
          return data; // 데이터 반환
        } else {
          // 저장 실패
          console.error('Search01 조회실패');
        }
      } catch (error) {
        console.error('Search01 조회실패', error);
      }
}
export async function Search02(board_id) {
  try {
      const response = await fetch(`${api}/api/blog/BoardSearch2`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({board_id}),
      });
      if (response.ok) {
        // 성공적으로 저장됨
        const data = await response.json(); // JSON 데이터를 파싱
        return data; // 데이터 반환
      } else {
        // 저장 실패
        console.error('Search02 조회실패');
      }
    } catch (error) {
      console.error('Search02 조회실패', error);
    }
}
export async function Search03(board_id) {
  try {
      const response = await fetch(`${api}/api/blog/BoardSearch3`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({board_id}),
      });
      if (response.ok) {
        // 성공적으로 저장됨
        const data = await response.json(); // JSON 데이터를 파싱
        return data; // 데이터 반환
      } else {
        // 저장 실패
        console.error('Search02 조회실패');
      }
    } catch (error) {
      console.error('Search02 조회실패', error);
    }
}
export async function upload01(html, board_type, board_id) {
  try {
      const chunkSize = 1024 * 50; // 각 덩어리의 크기 (예: 1KB * 50)
      const chunks = [];
      for (let i = 0; i < html.length; i += chunkSize) {
        chunks.push(html.slice(i, i + chunkSize));
      }
      for (let i = 0; i <chunks.length; i ++) {
        const isLastChunk = i === chunks.length - 1;
        const response = await fetch(`${api}/api/blog/board/upload?board_type=${board_type}&board_id=${board_id}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'text/plain',
          },
          body: isLastChunk ? chunks[i] + 'LASTCHUNK' : chunks[i] 
        });
        if (response.ok) {
          if (response.status === 201) {
            console.log("base64처리중");
          } else {
            // 성공적으로 저장됨
            const data = await response.text(); // JSON 데이터를 파싱
            return data; // 데이터 반환
          }
        } 
      }
    } catch (error) {
      console.log('base64변환중 에러발생');
    }
}

export async function fileStatUpdate(id) {
  try {
      const response = await fetch(`${api}/api/blog/board/fileStatUpdate`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({id}),
      });
      if (response.ok) {
      } else {
        // 저장 실패
        console.error('fileDelete 조회실패');
      }
    } catch (error) {
      console.error('fileDelete 조회실패', error);
    }
}