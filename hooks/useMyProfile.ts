import { useQuery } from '@tanstack/react-query';
import { usersAPI } from 'api/users';
import { queryKeys } from 'constants/query-keys.constant';

export default function useMyProfile() {
  return useQuery(queryKeys.my.profile, usersAPI.getMyProfile);
}
