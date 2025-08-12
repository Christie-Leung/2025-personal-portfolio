const logger = console;

type CacheItem = {
  uri: string;
  value: unknown;
  expires: number;
};

class Cache {
  private static readonly DEFAULT_TIMEOUT = 1000 * 30;

  private cache: Map<string, CacheItem> = new Map();

  constructor() {
    setInterval(() => {
      const now = Date.now();
      this.cache.forEach((item, key) => {
        if (item.expires < now) {
          this.expire(key);
        }
      });
    }, 250);
  }

  public expire(key: string): void {
    logger.debug('expiring', key);
    this.cache.delete(key);
  }

  public get<T>(key: string, uri: string): T | undefined {
    const cache = this.cache.get(key);
    if (cache?.uri === uri) {
      logger.debug('getting %s-%s', key, cache.uri);
      return cache.value as T;
    }

    return undefined;
  }

  public set<T>(key: string, uri: string, value: T, ttl?: number): void {
    logger.debug('setting %s-%s', key, uri);

    this.cache.set(key, {
      uri,
      value,
      expires: Date.now() + (ttl || Cache.DEFAULT_TIMEOUT),
    });
  }
}

export default new Cache();
