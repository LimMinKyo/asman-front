import { httpRequest } from 'src/api';

const BASE_URL = '/api/users';

class UsersAPI {
  async getMyProfile() {
    return httpRequest(`${BASE_URL}/profile`);
  }
}

export const usersAPI = new UsersAPI();
