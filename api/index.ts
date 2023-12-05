import { envKeys, getRuntimeEnv } from 'utils/env';
import { isClientBrowser } from 'utils/validate';

export const API_URL = getRuntimeEnv(envKeys.API_URL);

export const getAuthorizationHeaders = () => {
  if (isClientBrowser() && localStorage.getItem('access-token')) {
    return {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('access-token')}`,
    };
  }
  return null;
};
