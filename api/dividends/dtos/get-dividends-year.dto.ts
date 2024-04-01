import { ResponseDto } from 'api/common/response.dto';
import { Dividend } from '../entities/dividend.entity';

export interface GetDividendsYearRequest {
  date: string;
}

interface GetDividendsYearData {
  exchangeRate: number;
  data: Omit<Dividend, 'userId'>[][];
}

export interface GetDividendsYearResponse
  extends ResponseDto<GetDividendsYearData> {}
