import { Property } from '@tsed/schema';

/**
 * Pagination Response Metadata used to generate the pagination links for the response object
 */
export class PageMetadata {
  @Property()
  pageSize: number;

  @Property()
  nextPageToken: string | null;

  @Property()
  nextPageUrl: string | null;

  @Property()
  previousPageToken: string | null;

  @Property()
  previousPageUrl: string | null;

  constructor(pageSize: number) {
    this.pageSize = pageSize;
    this.nextPageToken = null;
    this.nextPageUrl = null;
    this.previousPageUrl = null;
    this.previousPageToken = null;
  }
}
