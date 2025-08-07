import { getRequiredEnv } from '~/config/configs/utils';

export const typesenseConfig = {
  adminApiKey: getRequiredEnv<string>('TYPESENSE_ADMIN_API_KEY'),
  searchApiKey: getRequiredEnv<string>('TYPESENSE_SEARCH_API_KEY'),
  host: getRequiredEnv<string>('TYPESENSE_HOST'),
  nodes: [
    {
      host: getRequiredEnv<string>('TYPESENSE_HOST'),
      port: 443,
      protocol: 'https',
    },
  ],
  connectionTimeoutSeconds: 10,
};

export type TypesenseConfig = typeof typesenseConfig;
