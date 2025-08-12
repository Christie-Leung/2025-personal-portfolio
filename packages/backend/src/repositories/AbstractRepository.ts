import {
  DataSource,
  EntityManager,
  InsertResult,
  LessThan,
  Repository,
  MoreThan,
  In,
} from 'typeorm';
import { EntityTarget } from 'typeorm/common/EntityTarget';
import { Inject } from '@tsed/di';
import { Id } from '@2025-personal-portfolio/common/dist/ids';
import { BadRequest, InternalServerError } from '@tsed/exceptions';
import * as DateUtils from '@2025-personal-portfolio/common/dist/utils/DateUtils';
import { MYSQL_DATA_SOURCE } from '~/repositories/sources/MysqlDataSource';
import { InternalPage, Pagination } from '~/core/page';
import { CrudEntity } from '~/core/db/entities/CrudEntity';
import { GraphData } from '~/generated/models/GraphData';
import { GraphDataPoint } from '~/generated/models/GraphDataPoint';
import CacheControl from '~/core/cache/CacheControl';

export type PaginationOptions = {
  order?: {
    key: string;
    reverse: boolean;
  };
};

export abstract class AbstractRepository<
  E extends CrudEntity<Id>,
> extends CacheControl {
  public dataStore: DataSource;

  protected client: Repository<E>;

  protected abstract _getEntity(): EntityTarget<E>;

  constructor(@Inject(MYSQL_DATA_SOURCE) dataStore: DataSource) {
    super();
    this.dataStore = dataStore;
    this.client = this.dataStore.getRepository(this._getEntity());
  }

  protected isTestMode = () => {
    return this.dataStore.options.type === 'sqlite';
  };

  /**
   * Returns the manager
   */
  public getManager = () => this.client.manager;

  /**
   * Returns a query builder with built-in pagination support
   * @param pagination the {@link Pagination} request object
   * @param alias the alias of primary table
   * @return builder returns the {@link SelectQueryBuilder<>}
   */
  protected withPagination = (
    pagination: Pagination,
    alias?: string,
    options?: PaginationOptions,
  ) => {
    const builder = this.client.createQueryBuilder(alias);
    const { getMany } = builder;
    const sortKey = options?.order?.key || 'autoId';
    const reverseSort = options?.order?.reverse || false;

    builder.getMany = async () => {
      const aliasedSortKey = alias ? `${alias}.${sortKey}` : sortKey;
      builder.orderBy({ [aliasedSortKey]: reverseSort ? 'ASC' : 'DESC' });
      builder.take(pagination.pageSize + 1);

      if (pagination.hasAnchor()) {
        const anchor = await this.client.findOneBy({
          id: pagination.anchorId() as any,
        });

        if (anchor) {
          const autoIdOperator = pagination.isBackward() ? MoreThan : LessThan;
          builder.andWhere({
            autoId: autoIdOperator(anchor.autoId),
          });
        }

        if (pagination.isBackward()) {
          builder.orderBy({ [aliasedSortKey]: reverseSort ? 'DESC' : 'ASC' });
        }
      }

      const result = await getMany.bind(builder)();
      if (pagination.hasAnchor() && pagination.isBackward()) {
        return result.reverse();
      }
      return result;
    };

    return builder;
  };

  /**
   * Creates one or more {@link E}
   */
  public create = (entity: E | E[]): Promise<InsertResult> => {
    return this.client.insert(entity as any);
  };

  /**
   * Finds the {@link E} by the {@link Id}
   */
  public findById = (id: Id): Promise<E | null> => {
    return this.client.findOneBy({ id: id as any });
  };

  /**
   * Finds the {@link E} by the {@link Id}
   */
  public findByAutoId = (autoId: number): Promise<E | null> => {
    return this.client.findOneBy({ autoId: autoId as any });
  };

  /**
   * Saves a {@link E} object to DB
   */
  public async save(entity: E, cacheKeysRemove?: string[]): Promise<E> {
    if (cacheKeysRemove) {
      await this.deleteCacheKeys(cacheKeysRemove);
    }

    return this.client.save(entity);
  }

  /**
   * Saves a {@link E} object to DB
   */
  public saveMany = (entity: E[]): Promise<E[]> => {
    return this.client.save(entity);
  };

  /**
   * Removes/deletes the {@link E}
   */
  public remove = async (entity: E): Promise<void> => {
    await this.client.remove(entity);
  };

  /**
   * Returns the list of {@link E} entities
   * @param pagination
   */
  public getAll = async (pagination: Pagination): Promise<InternalPage<E>> => {
    const response = await this.withPagination(pagination).getMany();

    return pagination.toPage(response);
  };

  /**
   * Creates and returns the created entity
   * @param entity
   */
  public createAndGet = async (entity: E): Promise<E> => {
    const { manager } = this.client;
    const result = await manager.insert(this._getEntity(), entity as any);
    if (result.identifiers.length !== 1) {
      throw new BadRequest('Failed to create a new entity');
    }

    const match = await manager.findOneBy(this._getEntity(), {
      autoId: result.identifiers[0].autoId,
    });
    if (!match) {
      throw new InternalServerError('Expected item to be found');
    }

    return match;
  };

  protected toCumulativeGraphData(
    original: GraphDataPoint[],
    days: number,
  ): GraphData {
    const data = {
      x: original.map((d) => DateUtils.dater(d.x).format('YYYY-MM-DD')),
      y: original.map((d) => d.y),
    };
    const startDate = DateUtils.dayjs().subtract(365 * 2, 'days');
    const endDate = DateUtils.dayjs();

    const processed: GraphData = { x: [], y: [] };
    let lastDataPoint = 0;
    for (
      let currentDate = startDate;
      currentDate.isBefore(endDate) || currentDate.isSame(endDate);
      currentDate = currentDate.add(1, 'day')
    ) {
      const indexOf = data.x.indexOf(currentDate.format('YYYY-MM-DD'));
      if (indexOf !== -1) {
        processed.x.push(data.x[indexOf]);
        processed.y.push(data.y[indexOf]);
        lastDataPoint = data.y[indexOf];
      } else {
        processed.x.push(currentDate.format('YYYY-MM-DD'));
        processed.y.push(lastDataPoint);
      }
    }

    const truncateIndex = Math.max(0, processed.x.length - days);
    return {
      x: processed.x.slice(truncateIndex),
      y: processed.y.slice(truncateIndex),
    };
  }

  /**
   * Provides transactional support for simple operations
   * @param manager
   */
  public $transaction = (manager: EntityManager) => {
    return {
      /**
       * This method is intended to be used after creating a new entity
       * The result _must_ be found, it not we should roll back the transaction
       */
      getByAutoId: async (autoId: number): Promise<E> => {
        const match = await manager.findOneBy(this._getEntity(), {
          autoId: autoId as any,
        });
        if (!match) {
          throw new InternalServerError('Expected item to be found');
        }

        return match;
      },
      createManyAndGet: async (entities: E[]): Promise<E[]> => {
        const result = await manager.insert(this._getEntity(), entities as any);
        if (result.identifiers.length !== entities.length) {
          throw new BadRequest('Failed to create a new entity');
        }

        const autoIds = result.identifiers.map((id) => id.autoId);
        const matches = await manager.findBy(this._getEntity(), {
          autoId: In(autoIds) as any,
        } as any);

        if (matches.length !== entities.length) {
          throw new InternalServerError('Expected all items to be found');
        }
        return matches;
      },
      createAndGet: async (entity: E): Promise<E> => {
        const result = await manager.insert(this._getEntity(), entity as any);
        if (result.identifiers.length !== 1) {
          throw new BadRequest('Failed to create a new entity');
        }

        const match = await manager.findOneBy(this._getEntity(), {
          autoId: result.identifiers[0].autoId,
        });
        if (!match) {
          throw new InternalServerError('Expected item to be found');
        }

        return match;
      },
      saveMany: (entity: E[]): Promise<E[]> => {
        return this.client.save(entity);
      },
      save: (entity: E): Promise<E> => {
        return manager.save(entity);
      },
      create: (entity: E | E[]): Promise<InsertResult> => {
        return manager.insert(this._getEntity(), entity as any);
      },
      remove: async (entity: E): Promise<void> => {
        await manager.remove(entity);
      },
    };
  };

  private deleteCacheKeys = async (keys: string[]) => {
    const promises = keys.map((key) => this.cache.del(key));
    await Promise.all(promises);
  };
}
