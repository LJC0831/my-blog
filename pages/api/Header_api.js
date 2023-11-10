import api from '../api/api';
import {exchangeString01 } from './api';

export async function login01(pwd) {
    try {
        pwd = exchangeString01(pwd);
        const response = await fetch(`${api}/api/blog/login01`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({pwd}),
        });
        if (response.ok) {
          // 성공적으로 저장됨
          const data = await response.json(); // JSON 데이터를 파싱
          return data; // 데이터 반환
        } else {
          // 저장 실패
          console.error('login01 조회실패');
        }
      } catch (error) {
        console.error('login01 조회실패', error);
      }
}