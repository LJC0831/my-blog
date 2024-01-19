const api = 'https://backendserver.shop:3000';
//const api = 'http://158.179.164.147:3000';
//const api = 'http://localhost:3000';

export function exchangeString01(text){ //  따옴표변환    
    return text.replace(/'/g, "\\'");
}

export default api;