import {
  PaginationRequest,
  PaginationResponse,
} from 'api/common/pagination.dto';
import { Dividend } from '../entities/dividend.entity';

export interface GetDividendsRequest extends PaginationRequest {
  date: string;
}

export interface GetDividendsResponse extends PaginationResponse<Dividend> {}
