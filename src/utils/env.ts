import { isClientBrowser } from './validate';

declare global {
  interface Window {
    __ENV: { [key: string]: string };
  }
}

export const envKeys = {
  API_URL: 'NEXT_PUBLIC_API_URL',
  NAVER_SITE_VERIFICATION: 'NAVER_SITE_VERIFICATION',
  GOOGLE_SITE_VERIFICATION: 'GOOGLE_SITE_VERIFICATION',
  GA_ID: 'GA_ID',
  GTM_ID: 'GTM_ID',
  BEUSABLE_ID: 'BEUSABLE_ID',
  SENTRY_DSN: 'SENTRY_DSN',
  SENTRY_ORG: 'SENTRY_ORG',
  SENTRY_PROJECT: 'SENTRY_PROJECT',
  SENTRY_AUTH_TOKEN: 'SENTRY_AUTH_TOKEN',
  SENTRY_ENABLED: 'SENTRY_ENABLED',
  KAKAO_API_KEY: 'NEXT_PUBLIC_KAKAO_API_KEY',
} as const;

type EnvName = keyof typeof envKeys;

export function getRuntimeEnv(envName: EnvName) {
  if (isClientBrowser()) {
    return window.__ENV[envName] || '';
  } else {
    return process.env[envName] || '';
  }
}
