import { GetDividendsYearRequest } from 'api/dividends/dtos/get-dividends-year.dto';
import { GetDividendsMonthRequest } from 'api/dividends/dtos/get-dividends-month.dto';

const MY = 'MY';
const PROFILE = 'PROFILE';

const DIVIDENDS = 'DIVIDENDS';

export const queryKeys = {
  my: {
    profile: [MY, PROFILE],
  },
  dividends: {
    month: (query: Omit<GetDividendsMonthRequest, 'page'>) => [
      DIVIDENDS,
      query,
    ],
    yaer: (query: GetDividendsYearRequest) => [DIVIDENDS, query],
  },
};
