module.exports = {
  images: {
    // 이미지 최적화 비활성화
    loader: 'default',
    path: '/',
  },

  exportPathMap: async function (defaultPathMap, { dev, dir, outDir, distDir, buildId }) {
    // 정적으로 렌더링할 페이지 경로 설정
    const pagesToExport = { 
      '/': { page: '/' }, 
      // 다른 페이지들...
      '/board/BoardWrite': { page: '/board/BoardWrite' },
      // '/board/BoardWrite': { page: '/board/BoardWrite' }, // 이 부분을 주석 처리하여 제외
    };

    return pagesToExport;
  },
};