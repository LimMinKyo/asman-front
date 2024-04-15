import { GetDividendsYearRequest } from 'src/api/dividends/dtos/get-dividends-year.dto';
import { GetDividendsMonthRequest } from 'src/api/dividends/dtos/get-dividends-month.dto';

const MY = 'MY';
const PROFILE = 'PROFILE';

const DIVIDENDS = 'DIVIDENDS';

export const queryKeys = {
  my: {
    profile: [MY, PROFILE],
  },
  dividends: {
    all: [DIVIDENDS],
    month: (query: Omit<GetDividendsMonthRequest, 'page'>) => [
      DIVIDENDS,
      query,
    ],
    yaer: (query: GetDividendsYearRequest) => [DIVIDENDS, query],
  },
};
