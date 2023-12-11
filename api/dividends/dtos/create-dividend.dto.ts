import { ResponseDto } from 'api/common/response.dto';
import { Unit } from 'api/common/unit.dto';

export interface CreateDividendRequest {
  dividendAt: string;
  name: string;
  unit: Unit;
  dividend: number;
  tax?: number;
}

export interface CreateDividendResponse extends ResponseDto {}
