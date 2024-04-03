import { useQuery } from '@tanstack/react-query';
import { usersAPI } from 'src/api/users';
import { queryKeys } from 'src/constants/query-keys.constant';

export default function useMyProfile() {
  return useQuery(queryKeys.my.profile, usersAPI.getMyProfile);
}
