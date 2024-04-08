import { httpRequest } from 'src/api';
import { RefreshResponse } from './dtos/refresh.dto';

const BASE_URL = '/api/auth';

class AuthAPI {
  async refresh(): Promise<RefreshResponse> {
    return httpRequest(`${BASE_URL}/refresh`, {
      method: 'POST',
    });
  }
}

export const authAPI = new AuthAPI();
