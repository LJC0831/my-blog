import { toast } from 'react-toastify';
//const api = 'https://backendserver.shop:3000';
const api = 'https://port-0-backend-nodejs-20zynm2mlk2nnlwj.sel4.cloudtype.app';
//const api = 'http://localhost:3000';

export function exchangeString01(text){ //  따옴표변환    
    return text.replace(/'/g, "\\'");
}

// toast 메세지 처리
export const showToast = (data) => {
    toast.info(data, {
      autoClose: 2000, // 토스트 메시지가 보여지는 시간 (2초)
      position: 'top-center', // 토스트 메시지 위치
      style: {
        background: '#888', // 회색 배경 색상
        fontSize: '14px', // 작은 글꼴 크기
        color: '#fff', // 흰색 글자 색상
      },
    });
  };

export default api;