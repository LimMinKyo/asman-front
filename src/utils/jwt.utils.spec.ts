import { JwtPayload } from 'jwt-decode';
import { jwtUtils } from './jwt.utils';

describe('jwtUtils', () => {
  it('should set and get access token correctly', () => {
    const token = 'exampleAccessToken';
    jwtUtils.setAccessToken(token);
    expect(jwtUtils.getAccessToken()).toBe(token);
  });

  it('should remove access token correctly', () => {
    const token = 'exampleAccessToken';
    jwtUtils.setAccessToken(token);
    jwtUtils.removeAccessToken();
    expect(jwtUtils.getAccessToken()).toBeNull();
  });

  describe('getIsTokenExpired', () => {
    it('should return true if token is expired', () => {
      // 만료 시간이 현재 시간보다 이전인 토큰 생성
      const expiredToken = createAccessToken({
        exp: Math.floor(Date.now() / 1000) - 3600,
      }); // 1시간 전
      expect(jwtUtils.getIsTokenExpired(expiredToken)).toBe(true);
    });

    it('should return false if token is not expired', () => {
      // 만료 시간이 현재 시간보다 이후인 토큰 생성
      const notExpiredToken = createAccessToken({
        exp: Math.floor(Date.now() / 1000) + 3600,
      }); // 1시간 후
      expect(jwtUtils.getIsTokenExpired(notExpiredToken)).toBe(false);
    });
  });
});

// 토큰을 생성하는 함수 (임시 함수)
function createAccessToken(payload: JwtPayload): string {
  const header = Buffer.from(
    JSON.stringify({ alg: 'HS256', typ: 'JWT' }),
  ).toString('base64'); // JWT의 header 부분 생성
  const payloadString = Buffer.from(JSON.stringify(payload)).toString('base64'); // 페이로드 인코딩
  return `${header}.${payloadString}.signature`; // 헤더, 페이로드, 서명을 합쳐서 토큰 생성
}
