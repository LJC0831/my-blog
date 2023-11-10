const api = 'https://port-0-backend-nodejs-20zynm2mlk2nnlwj.sel4.cloudtype.app';
//const api = 'http://localhost:3000';

export function exchangeString01(text){ //  따옴표변환    
    return text.replace(/'/g, "\\'");
}

export default api;