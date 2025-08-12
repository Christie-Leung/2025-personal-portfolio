import { getRequiredEnv } from '~/config/configs/utils';

const isLocal = process.env.NODE_ENV === 'local';
const domain = 'murphyshome.net';

// noinspection JSUnresolvedReference
export const boxConfig = {
  domain: getRequiredEnv<string>('DOMAIN'),
  baseApi: isLocal
    ? 'http://localhost:3000'
    : `https://api.${domain}`,
  baseUrls: {
    frontend: isLocal
      ? 'http://localhost:8000'
      : `https://christie.${domain}`
  },
  isLocal,
  is: {
    frontend: (origin: string | null): boolean => {
      return !!origin && origin.includes(boxConfig.baseUrls.frontend);
    },
  },
};
export type BoxConfig = typeof boxConfig;
