import { configuration, Configuration, injectable } from '@tsed/di';
import { $log } from "@tsed/logger";
import { DataSource, EntityManager } from 'typeorm';
import * as entities from '~/protocols/entities';
import { DBConfig } from '~/config';

export const MYSQL_DATA_SOURCE = Symbol.for('MysqlDataSource') as unknown as DataSource;
export type RunInTransaction<T> = (manager: EntityManager) => Promise<T>;

const testDb = async () => {
  const dataStore = new DataSource({
    type: 'sqlite',
    synchronize: true,
    database: ':memory:',
    entities: [...Object.values(entities)],
  });

  await dataStore.initialize();
  return dataStore;
};

const mainDb = async (config: DBConfig) => {
  const dataStore = new DataSource({
    type: 'mysql',
    charset: 'utf8mb4',
    entities: [...Object.values(entities)],
    host: config.host,
    port: config.port,
    username: config.username,
    password: config.password,
    database: config.dbName,
  });

  await dataStore.initialize();

  return dataStore;
};

// registerProvider<DataSource>({
//   provide: MYSQL_DATA_SOURCE,
//   type: MYSQL_DATA_SOURCE,
//   deps: [Logger, Configuration],
//   async useAsyncFactory(logger: Logger, configuration: Configuration) {
//     if (configuration.env === 'test') {
//       logger.info('Running in-memory SQLite');
//       return testDb();
//     }

//     const dbConfig = configuration.db as DBConfig;
//     logger.info(`MySQL connected to db ${dbConfig.dbName}`);
//     return mainDb(dbConfig);
//   },
//   hooks: {
//     $onDestroy(dataSource) {
//       return dataSource.isInitialized && dataSource.destroy();
//     },
//   },
// });

injectable<DataSource>(MYSQL_DATA_SOURCE)
  .asyncFactory(async () => {
    const settings = configuration() as unknown as { env: string; db: DBConfig };

    if (settings.env === "test") {
      $log.info("Running in-memory SQLite");
      return testDb();
    }

    const dbConfig = settings.db as DBConfig;
    $log.info(`MySQL connected to db ${dbConfig.dbName}`);
    return mainDb(dbConfig);
  })
  .hooks({
    $onDestroy(dataSource) {
      return dataSource.isInitialized && dataSource.destroy();
    }
  })
  .token();

