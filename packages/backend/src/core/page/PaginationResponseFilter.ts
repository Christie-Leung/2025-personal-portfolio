import {
  ResponseFilter,
  ResponseFilterMethods,
} from '@tsed/platform-response-filter';

import { Context } from '@tsed/platform-params';
import { joinUriComponents } from '@2025-personal-portfolio/common/dist/utils';
import { Constant } from '@tsed/di';
import { Page, PageMetadata } from '@2025-personal-portfolio/common/dist/paging';
import { InternalPage } from './InternalPage';
import { BoxConfig } from '~/config';
import { InternalPageMetadata } from '~/core/page/InternalPageMetadata';

type Data = { result: unknown[] };

@ResponseFilter('application/json')
export class PaginationResponseFilter implements ResponseFilterMethods {
  @Constant('box')
  protected boxConfig: BoxConfig;

  toPage = <T>(
    result: T[],
    meta: InternalPageMetadata,
    listUrl: string,
  ): Page<T> => {
    const metadata = new PageMetadata(result.length);

    const url = new URL(listUrl);
    if (url.searchParams.has('pageToken')) {
      url.searchParams.delete('pageToken');
    }

    if (meta.nextPage) {
      const nextUrl = new URL(url);
      nextUrl.searchParams.append('pageToken', meta.nextPage);
      metadata.nextPageUrl = nextUrl.toString();
      metadata.nextPageToken = meta.nextPage;
    }
    if (meta.previousPage) {
      const previousUrl = new URL(url);
      previousUrl.searchParams.append('pageToken', meta.previousPage);
      metadata.previousPageUrl = previousUrl.toString();
      metadata.previousPageToken = meta.previousPage;
    }

    return {
      result,
      metadata,
    };
  };

  /**
   * Transforms the response object to pagination if required
   */
  // @ts-ignore - this is catch all for all responses
  transform(data: Data, $ctx: Context) {
    if (!($ctx.data instanceof InternalPage)) {
      return data;
    }

    if ($ctx.event.request.url) {
      const listUrl = joinUriComponents(
        this.boxConfig.baseApi,
        $ctx.event.request.url,
      );

      $ctx.response.status(206);
      return this.toPage(data.result, $ctx.data.metadata, listUrl);
    }

    return data;
  }
}
