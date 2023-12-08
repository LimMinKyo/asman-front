import { httpRequest } from 'api';
import {
  CreateDividendRequest,
  CreateDividendResponse,
} from './dtos/create-dividend.dto';
import {
  GetDividendsRequest,
  GetDividendsResponse,
} from './dtos/get-dividends.dto';
import { UpdateDividendRequest } from './dtos/update-dividend.dto';

const BASE_URL = '/api/dividends';

class DividendsAPI {
  /**
   * 배당일지 생성
   */
  async createDividend(
    body: CreateDividendRequest,
  ): Promise<CreateDividendResponse> {
    return httpRequest(BASE_URL, {
      method: 'POST',
      body,
    });
  }

  /**
   * 배당일지 조회
   */
  async getDividends(
    query: GetDividendsRequest,
  ): Promise<GetDividendsResponse> {
    return httpRequest(BASE_URL, {
      query,
    });
  }

  /**
   * 배당일지 삭제
   */
  async updateDividend(id: number, body: UpdateDividendRequest) {
    return httpRequest(BASE_URL + `/${id}`, {
      method: 'PATCH',
      body,
    });
  }

  /**
   * 배당일지 삭제
   */
  async deleteDividend(id: number) {
    return httpRequest(BASE_URL + `/${id}`, {
      method: 'DELETE',
    });
  }
}

export const dividendsAPI = new DividendsAPI();
