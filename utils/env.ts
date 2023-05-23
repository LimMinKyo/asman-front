import { isClientBrowser } from './validate';

declare global {
  interface Window {
    __ENV: { [key: string]: string };
  }
}

export default function getRuntimeEnv(envName: string) {
  if (isClientBrowser()) {
    return window.__ENV[envName];
  } else {
    return process.env[envName];
  }
}
