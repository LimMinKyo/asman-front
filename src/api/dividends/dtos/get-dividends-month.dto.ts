import {
  PaginationRequest,
  PaginationResponse,
} from 'src/api/common/pagination.dto';
import { Dividend } from '../entities/dividend.entity';

export interface GetDividendsMonthRequest extends PaginationRequest {
  date: string;
}

export interface GetDividendsMonthResponse
  extends PaginationResponse<Dividend> {}
