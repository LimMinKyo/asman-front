import { ofetch } from 'ofetch';
import { envKeys, getRuntimeEnv } from 'utils/env';
import { isClientBrowser } from 'utils/validate';

const API_URL = getRuntimeEnv(envKeys.API_URL);

const getAuthorizationHeaders = () => {
  if (isClientBrowser() && localStorage.getItem('access-token')) {
    return {
      Authorization: `Bearer ${localStorage.getItem('access-token')}`,
    };
  }
  return null;
};

export const httpRequest = ofetch.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
    ...getAuthorizationHeaders(),
  },
  onResponse({ response }) {
    if (response.status === 401) {
      location.href = '/main';
    }
  },
});
