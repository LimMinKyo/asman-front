import { ofetch } from 'ofetch';
import { jwtUtils } from 'src/utils/jwt.utils';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const httpRequest = ofetch.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  credentials: 'include',
  onRequest(context) {
    const accessToken = jwtUtils.getAccessToken();
    if (accessToken) {
      context.options.headers = new Headers({
        Authorization: `Bearer ${accessToken}`,
      });
    }
  },
});
