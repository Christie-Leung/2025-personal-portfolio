import { CGCodegenOperation, X_TS_CACHE } from '~/types';

/**
 * Processes the x-ts-type extension
 */
export const processXTSCache = (operation: CGCodegenOperation) => {
  const cache = operation.vendorExtensions[X_TS_CACHE];
  if (!cache) {
    return;
  }

  operation.vendorExtensions[X_TS_CACHE] = cache;
};
