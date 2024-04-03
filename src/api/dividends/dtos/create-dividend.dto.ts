import { ResponseDto } from 'src/api/common/response.dto';
import { Unit } from 'src/api/common/unit.dto';

export interface CreateDividendRequest {
  dividendAt: string;
  name: string;
  unit: Unit;
  dividend: number;
  tax?: number;
}

export interface CreateDividendResponse extends ResponseDto {}
