import { getRequiredEnv } from '~/config/configs/utils';

export const auth0Config = {
  domain: getRequiredEnv<string>('AUTH0_DOMAIN'),
  clientId: getRequiredEnv<string>('AUTH0_LOGIN_CLIENT_ID'),
  management: {
    clientId: getRequiredEnv<string>('AUTH0_MANAGEMENT_CLIENT_ID'),
    clientSecret: getRequiredEnv<string>('AUTH0_MANAGEMENT_CLIENT_SECRET'),
  },
};

export type Auth0Config = typeof auth0Config;
