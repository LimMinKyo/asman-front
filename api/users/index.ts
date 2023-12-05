import { API_URL, getAuthorizationHeaders } from 'api';

const BASE_URL = `${API_URL}/api/users`;

class UsersAPI {
  async getMyInfo() {
    return fetch(`${BASE_URL}/profile`, {
      headers: {
        ...getAuthorizationHeaders(),
      },
    }).then((response) => {
      return response.json();
    });
  }
}

export const usersAPI = new UsersAPI();
