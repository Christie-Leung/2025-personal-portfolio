// noinspection JSUnresolvedReference

import { getRequiredEnv } from '~/config/configs/utils';

export const dbConfig = {
  host: getRequiredEnv<string>('RDS_HOSTNAME'),
  port: parseInt(getRequiredEnv<string>('RDS_PORT'), 10),
  dbName: getRequiredEnv<string>('RDS_DB_NAME'),
  username: getRequiredEnv<string>('RDS_USERNAME'),
  password: getRequiredEnv<string>('RDS_PASSWORD'),
  encryptionKey: getRequiredEnv<string>('RDS_ENCRYPTION_KEY'),
};
export type DBConfig = typeof dbConfig;
