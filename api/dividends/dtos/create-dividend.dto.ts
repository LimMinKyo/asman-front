import { ResponseDto } from 'api/common/response.dto';
import { Unit } from 'api/common/unit.dto';
import { Dividend } from '../entities/dividend.entity';

export interface CreateDividendRequest {
  dividendAt: string;
  name: string;
  unit: Unit;
  dividend: number;
  tax?: number;
}

export interface CreateDividendResponse extends ResponseDto<Dividend> {}
