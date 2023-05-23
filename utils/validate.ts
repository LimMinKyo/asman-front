/**
 * 브라우저 환경인지 Node.js 환경인지 검사하는 유틸함수
 */
export const isClientBrowser = () => {
  if (typeof window !== 'undefined') {
    return true;
  }
  return false;
};
