import { Unit } from 'api/common/unit.dto';

export interface Dividend {
  createdAt: Date;
  dividend: number;
  dividendAt: Date;
  id: number;
  name: string;
  tax: number;
  unit: Unit;
  updatedAt: Date;
  userId: number;
}
