import * as Sentry from '@sentry/nextjs';
import { Replay } from '@sentry/nextjs';
import { envKeys, getRuntimeEnv } from 'utils/env';

const SENTRY_DSN = getRuntimeEnv(envKeys.SENTRY_DSN);

Sentry.init({
  dsn: SENTRY_DSN,
  // We recommend adjusting this value in production, or using tracesSampler
  // for finer control
  enabled: getRuntimeEnv(envKeys.SENTRY_ENABLED) === 'true',

  // Replay may only be enabled for the client-side
  integrations: [new Replay()],

  // Set tracesSampleRate to 1.0 to capture 100%
  // of transactions for performance monitoring.
  // We recommend adjusting this value in production
  tracesSampleRate: 1.0,

  // Capture Replay for 10% of all sessions,
  // plus for 100% of sessions with an error
  replaysSessionSampleRate: 0.1,
  replaysOnErrorSampleRate: 1.0,
  // ...
  // Note: if you want to override the automatic release value, do not set a
  // `release` value here - use the environment variable `SENTRY_RELEASE`, so
  // that it will also get attached to your source maps
});
