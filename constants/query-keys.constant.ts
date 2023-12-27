import { GetDividendsRequest } from 'api/dividends/dtos/get-dividends.dto';

const MY = 'MY';
const PROFILE = 'PROFILE';

const DIVIDENDS = 'DIVIDENDS';

export const queryKeys = {
  my: {
    profile: [MY, PROFILE],
  },
  dividends: (query: Omit<GetDividendsRequest, 'page'>) => [DIVIDENDS, query],
};
