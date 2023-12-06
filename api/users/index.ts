import { httpRequest } from 'api';

const BASE_URL = '/api/users';

class UsersAPI {
  async getMyInfo() {
    return httpRequest(`${BASE_URL}/profile`);
  }
}

export const usersAPI = new UsersAPI();
