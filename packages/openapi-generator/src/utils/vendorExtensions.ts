import {
  CGCodegenResponse,
  CGCodegenVendorExtensions,
  X_TS_IMPORTS,
  XImports,
} from '~/types';

/**
 * Adds an import to the vendor extension as x-ts-imports
 */
export const addImport = (
  vendorExtension: CGCodegenVendorExtensions,
  item: XImports,
) => {
  if (!vendorExtension[X_TS_IMPORTS]) {
    vendorExtension[X_TS_IMPORTS] = [];
  }

  const match = vendorExtension?.[X_TS_IMPORTS].find(
    (i) => i.path === item.path && i.name === item.name,
  );
  if (!match) {
    vendorExtension[X_TS_IMPORTS].push(item);
  }

  return vendorExtension;
};

/**
 * Returns true if the response is of type pagination
 * @param response
 */
export const isPaginatedResponse = (response: CGCodegenResponse): boolean => {
  return (
    Boolean(response.vendorExtensions['x-ts-page-type']) &&
    response.defaultContent?.schema?.name === 'Page'
  );
};
