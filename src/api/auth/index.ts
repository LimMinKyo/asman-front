import { httpRequest } from 'src/api';
import { RefreshResponse } from './dtos/refresh.dto';
import { LogoutResponse } from './dtos/logout.dto';

const BASE_URL = '/api/auth';

class AuthAPI {
  async refresh(): Promise<RefreshResponse> {
    return httpRequest(`${BASE_URL}/refresh`, {
      method: 'POST',
    });
  }

  async logout(): Promise<LogoutResponse> {
    return httpRequest(`${BASE_URL}/logout`, {
      method: 'POST',
    });
  }
}

export const authAPI = new AuthAPI();
