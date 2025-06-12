const isLocal = typeof window !== 'undefined' &&
    window.location.host.startsWith('localhost');

const environment = isLocal ? 'local' : 'prod';

export const config = {
  environment,
  isLocal,
  baseUrl: isLocal ? 'http://localhost:3000' : 'https://christie.murphyshome.net',
};

export type Config = typeof config;
export default config;
