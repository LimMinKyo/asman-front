import { useQuery } from '@tanstack/react-query';
import { usersAPI } from 'api/users';

export default function useMyInfo() {
  return useQuery(['my', 'info'], usersAPI.getMyInfo);
}
