import { jwtDecode } from 'jwt-decode';

class JwtUtils {
  private accessToken: string | null = null;

  getAccessToken() {
    return this.accessToken;
  }

  removeAccessToken() {
    this.accessToken = null;
  }

  setAccessToken(accessToken: string) {
    this.accessToken = accessToken;
  }

  getIsTokenExpired(token: string) {
    const tokenExp = this.getTokenExpiration(token);

    if (!tokenExp) {
      return true;
    }

    const currentTimestamp = Math.floor(Date.now() / 1000); // 현재 시간의 타임스탬프 (초 단위)

    return tokenExp < currentTimestamp;
  }

  private getTokenExpiration(token: string) {
    const payload = jwtDecode(token);
    return payload.exp; // 토큰의 만료 시간 (초 단위)
  }
}

export const jwtUtils = new JwtUtils();
