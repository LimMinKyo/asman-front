import { ResponseDto } from 'api/common/response.dto';
import { Dividend } from '../entities/dividend.entity';

export interface GetDividendsRequest {
  date: string;
}

export interface GetDividendsResponse extends ResponseDto<Dividend[]> {}
