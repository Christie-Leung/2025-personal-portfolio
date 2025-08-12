import * as ids from '../ids';

/**
 * Utility for generating and reading {@link Id}
 */
class IdUtils {
  private readonly constructorsByPrefix: Record<string, ids.Id>;

  constructor() {
    this.constructorsByPrefix = {};

    Object.values(ids)
      .filter((id) => !(id instanceof ids.Id))
      .forEach((id) => {
        // @ts-ignore
        const prefix = id.PREFIX;
        if (!prefix) {
          return;
        }

        // @ts-ignore
        this.constructorsByPrefix[prefix] = id;
      });
  }

  /**
   * Generates a new {@link Id} from the given hex
   * @param hex the hex to generate an {@link Id} from
   * @returns the generated {@link Id}
   */
  public fromHex = <T extends ids.Id>(hex: string): T => {
    const prefix = hex.slice(0, 2);
    if (!this.constructorsByPrefix[prefix]) {
      throw new Error(`Could not find Id for prefix ${prefix}`);
    }

    // @ts-ignore
    return new this.constructorsByPrefix[prefix](hex) as T;
  };
}

export const idUtils = new IdUtils();
