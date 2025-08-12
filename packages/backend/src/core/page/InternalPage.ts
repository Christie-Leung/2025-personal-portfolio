import { CollectionOf, Generics } from '@tsed/schema';
import { InternalPageMetadata } from './InternalPageMetadata';

@Generics('T')
export class InternalPage<T> {
  @CollectionOf('T')
  result: T[];

  metadata: InternalPageMetadata;

  constructor(result: T[], metadata?: InternalPageMetadata) {
    this.result = result;
    this.metadata = metadata || InternalPageMetadata.builder().build();
  }

  /**
   * Pipes the data into a mapper and returns a new {@link InternalPage}
   * @param mapper
   */
  public transform = <U>(mapper: (data: T) => U) => {
    const mapped = this.result.map(mapper);

    return new InternalPage<U>(mapped, this.metadata);
  };
}
