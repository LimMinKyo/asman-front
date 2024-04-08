import { httpRequest } from 'src/api';
import { GetMyProfile } from './dtos/get-my-profile.dto';

const BASE_URL = '/api/users';

class UsersAPI {
  async getMyProfile(): Promise<GetMyProfile> {
    return httpRequest(`${BASE_URL}/profile`);
  }
}

export const usersAPI = new UsersAPI();
