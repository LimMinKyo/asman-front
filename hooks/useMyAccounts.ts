import { useQuery } from '@tanstack/react-query';
import { accountsAPI } from 'api/accounts';

export default function useMyAccounts() {
  return useQuery(['my', 'accounts'], accountsAPI.getAccounts);
}
