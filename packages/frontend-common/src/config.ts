

import { getOptionalEnv } from './env';
import { getDevice } from '@2025-personal-portfolio/common/src/core'

const isBrowser = getDevice() === 'Browser';

// Safe `isLocal` check (works for Web & Mobile)
let isLocal;
if (isBrowser) {
  isLocal =
    typeof window !== 'undefined' &&
    window.location.host.startsWith('localhost');
} else {
  // Check if process exists before accessing its properties
  isLocal = typeof process !== 'undefined' && process.env.NODE_ENV === 'development';
}
// Safe host determination (ensure `window` exists before accessing)
let host;
if (isBrowser) {
  if (isLocal) {
    host = 'http://localhost';
  } else {
    host = `https://${window.location.host}`;
  }
} else if (isLocal) {
  host = 'http://localhost';
} else {
  host = 'https://christie.murphyshome.net';
}

// Safe API host determination
let apiHost;
if (isBrowser) {
  if (isLocal) {
    apiHost = 'http://localhost:3000';
  } else {
    apiHost = `https://api.${window.location.host
      .replace('www.', '')}`;
  }
} else if (isLocal) {
  apiHost = 'http://localhost:3000';
} else {
  apiHost = 'https://api.murphyshome.net';
}

// Safe domain determination
const domain = isBrowser ? window.location.hostname : 'murphyshome.net';

let environment = 'prod';
if (isLocal) {
  environment = 'local';
}

export const config = {
  environment,
  app: {
    version: getOptionalEnv('VITE_APP_VERSION'),
  },
  host: getOptionalEnv('VITE_HOST') || host,
  apiHost:
    getOptionalEnv('VITE_USE_REALM') === 'prod'
      ? 'https://api.murphyshome.net'
      : apiHost,
  isLocal,
  domain,
  isBrowser,
  feedback: {
    id: isLocal ? 'bfe7cac55d9a2e' : 'b894cf16dfee46',
  },
  // typesense: {
  //   searchApiKey: getOptionalEnv('VITE_TYPESENSE_SEARCH_API_KEY'),
  //   typesenseHost: getOptionalEnv('VITE_TYPESENSE_HOST'),
  // },
};
export type Config = typeof config;
export default config;
