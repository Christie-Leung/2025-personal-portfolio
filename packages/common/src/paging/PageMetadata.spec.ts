import { PageMetadata } from './PageMetadata';

describe('PageMetadata', () => {
  it('should set pageSize, nextPageUrl, and previousPageUrl to expected values when creating a new PageMetadata object', () => {
    const pageSize = 10;
    const metadata = new PageMetadata(pageSize);

    expect(metadata.pageSize).toBe(pageSize);
    expect(metadata.nextPageUrl).toBeNull();
    expect(metadata.previousPageUrl).toBeNull();
  });

  // Properties can be accessed and modified successfully
  it('should be able to access and modify the properties of a PageMetadata object', () => {
    const pageSize = 10;
    const metadata = new PageMetadata(pageSize);

    metadata.pageSize = 20;
    metadata.nextPageUrl = 'https://example.com/next';
    metadata.previousPageUrl = 'https://example.com/previous';

    expect(metadata.pageSize).toBe(20);
    expect(metadata.nextPageUrl).toBe('https://example.com/next');
    expect(metadata.previousPageUrl).toBe('https://example.com/previous');
  });

  it('should set nextPageUrl and previousPageUrl to null or a string when modifying the properties of a PageMetadata object', () => {
    const pageSize = 10;
    const metadata = new PageMetadata(pageSize);

    metadata.nextPageUrl = null;
    metadata.previousPageUrl = 'https://example.com/previous';

    expect(metadata.nextPageUrl).toBeNull();
    expect(metadata.previousPageUrl).toBe('https://example.com/previous');
  });

  it('should set nextPageUrl and previousPageUrl to an empty string when modifying the properties of a PageMetadata object', () => {
    const pageSize = 10;
    const metadata = new PageMetadata(pageSize);

    metadata.nextPageUrl = '';
    metadata.previousPageUrl = '';

    expect(metadata.nextPageUrl).toBe('');
    expect(metadata.previousPageUrl).toBe('');
  });
});
