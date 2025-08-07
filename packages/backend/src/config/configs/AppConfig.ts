import { readFileSync } from 'fs';
import { getRequiredEnv } from '~/config/configs/utils';

const pkg = JSON.parse(readFileSync('./package.json', { encoding: 'utf8' }));

export const appConfig = {
  name: pkg.name,
  version: getRequiredEnv<string>('VERSION'),
  hash: getRequiredEnv<string>('HASH'),
};
export type AppConfig = typeof appConfig;
