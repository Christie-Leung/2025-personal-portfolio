import { useDecorators } from '@tsed/core';
import { Injectable, PipeMethods, RawQueryParams, UsePipe } from '@tsed/common';
import { DirectionalToken } from './DirectionalToken';
import { Pagination } from './Pagination';

/**
 * A pipe for reading the pagination query parameters and creating a {@link Pagination} object that can then be used
 */
@Injectable()
export class PaginationContextPipe
  implements PipeMethods<Record<string, string>, Pagination>
{
  transform(params: Record<string, string>): Pagination {
    const pagination = new Pagination();
    pagination.pageSize =
      parseInt(params.pageSize, 10) || Pagination.DEFAULT_PAGE_SIZE;

    if (params.pageToken) {
      try {
        pagination.pageToken = DirectionalToken.fromString(params.pageToken);
      } catch (e) {
        // no-op
      }
    }

    return pagination;
  }
}

/**
 * Denotes the object to use the {@link PaginationContextPipe} pipe
 * @constructor
 */
export function PageContext() {
  // @ts-ignore
  return useDecorators(RawQueryParams(), UsePipe(PaginationContextPipe));
}
