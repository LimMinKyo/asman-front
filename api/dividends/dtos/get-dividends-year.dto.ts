import { ResponseDto } from 'api/common/response.dto';

export interface GetDividendsYearRequest {
  date: string;
}

interface GetDividendsYearData {
  date: string;
  total: number;
  dividend: number;
  tax: number;
}

export interface GetDividendsYearResponse
  extends ResponseDto<GetDividendsYearData[]> {}
