import { httpRequest } from 'src/api';
import {
  CreateDividendRequest,
  CreateDividendResponse,
} from './dtos/create-dividend.dto';
import {
  GetDividendsMonthRequest,
  GetDividendsMonthResponse,
} from './dtos/get-dividends-month.dto';
import { UpdateDividendRequest } from './dtos/update-dividend.dto';
import {
  GetDividendsYearRequest,
  GetDividendsYearResponse,
} from './dtos/get-dividends-year.dto';

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

  /**
   * 배당일기 월별 조회
   */
  async getDividendsMonth(
    query: GetDividendsMonthRequest,
  ): Promise<GetDividendsMonthResponse> {
    return httpRequest(BASE_URL + '/month', {
      query,
    });
  }

  /**
   * 배당일지 연간 통계 조회
   */
  async getDividendsYear(
    query: GetDividendsYearRequest,
  ): Promise<GetDividendsYearResponse> {
    return httpRequest(BASE_URL + '/year', {
      query,
    });
  }
}

export const dividendsAPI = new DividendsAPI();
