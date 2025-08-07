import { readFileSync } from 'fs';
import { envs } from './envs';
import { DBConfig, dbConfig } from './configs/DBConfig';
import { BoxConfig, boxConfig } from './configs/BoxConfig';
import { appConfig, AppConfig } from './configs/AppConfig';

const pkg = JSON.parse(readFileSync('./package.json', { encoding: 'utf8' }));

export interface GatewayConfig {
  app: AppConfig;
  box: BoxConfig;
  db: DBConfig;
  // typesense: TypesenseConfig;
}

export type ServerConfiguration = GatewayConfig & Partial<TsED.Configuration>;

const config: ServerConfiguration = {
  version: pkg.version,
  envs,
  app: appConfig,
  box: boxConfig,
  db: dbConfig,
  // auth0: auth0Config,
  // typesense: typesenseConfig,
};

export default config;

export {
  appConfig,
  AppConfig,
  dbConfig,
  DBConfig,
  boxConfig,
  BoxConfig,
  // auth0Config,
  // Auth0Config,
  // typesenseConfig,
  // TypesenseConfig,
};
