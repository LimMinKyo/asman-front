import { ofetch } from 'ofetch';
import { isClientBrowser } from 'utils/validate';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

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
      localStorage.removeItem('access-token');
      location.href = '/main';
    }
  },
});
