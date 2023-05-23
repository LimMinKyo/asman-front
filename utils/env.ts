declare global {
  interface Window {
    __ENV: { [key: string]: string };
  }
}

const isClientBrowser = () => {
  if (typeof window !== 'undefined') {
    return true;
  }
  return false;
};

export default function getRuntimeEnv(envName: string) {
  if (isClientBrowser()) {
    return window.__ENV[envName];
  } else {
    return process.env[envName];
  }
}
