import { Id } from '@2025-personal-portfolio/common/dist/ids';
import { BadRequest } from '@tsed/exceptions';
import { Direction, DirectionalToken } from './DirectionalToken';
import { CrudEntity } from '~/core/db/entities/CrudEntity';
import { InternalPageMetadata } from './InternalPageMetadata';
import { InternalPage } from './InternalPage';

/**
 * Creates a Pagination object generated from the query parameters.
 * This object will also be used to convert an array of result to a paginated response
 */
export class Pagination {
  public static DEFAULT_PAGE_SIZE = 50;

  pageSize: number;

  pageToken?: DirectionalToken;

  /**
   * Returns an empty page
   */
  public static emptyPage = (pageSize = Pagination.DEFAULT_PAGE_SIZE) => {
    const page = new Pagination();
    page.pageSize = pageSize;

    return page;
  };

  /**
   * Returns an empty page
   */
  public static ofSize = (pageSize: number) => {
    const page = new Pagination();
    page.pageSize = pageSize;

    return page;
  };

  /**
   * Returns true if the pagination has an anchor
   */
  hasAnchor() {
    return this.pageToken != null;
  }

  /**
   * Returns true if the direction is forward
   */
  isForward() {
    if (!this.pageToken) {
      throw new BadRequest('No page token provided to fetch anchor id from');
    }

    return this.pageToken.direction === Direction.Forward;
  }

  /**
   * Returns true if the direction is backward
   */
  isBackward() {
    if (!this.pageToken) {
      throw new BadRequest('No page token provided to fetch anchor id from');
    }

    return this.pageToken.direction === Direction.Backward;
  }

  /**
   * Returns the anchor id
   */
  anchorId(): Id {
    if (!this.pageToken) {
      throw new BadRequest('No page token provided to fetch anchor id from');
    }

    return this.pageToken.id;
  }

  /**
   * Converts the given array of  results to a paginated response.
   */
  toPage<T extends CrudEntity<Id>>(list: T[]) {
    if (list.length === 0) {
      return new InternalPage([], InternalPageMetadata.builder().build());
    }

    const metaBuilder = InternalPageMetadata.builder();

    const isBackward = this.hasAnchor() && this.isBackward();
    const hasMore = list.length > this.pageSize;

    let result = list;
    if (hasMore) {
      if (isBackward) {
        result = list.slice(1);
      } else {
        result = list.slice(0, Math.min(this.pageSize, list.length - 1));
      }
    }

    const first = result[0];
    const last = result.at(-1) as T;

    if (hasMore || isBackward) {
      metaBuilder.withNextPage(last.id);
    }

    if (this.hasAnchor() && !(!hasMore && isBackward)) {
      metaBuilder.withPreviousPage(first.id);
    }

    return new InternalPage(result, metaBuilder.build());
  }
}
