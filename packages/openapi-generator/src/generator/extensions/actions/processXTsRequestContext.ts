import {
  CGCodegenOperation,
  CGCodegenOperationGroup,
  X_TS_REQUEST_CONTEXT,
} from '~/types';
import { isServer } from '~/utils/generatorType';
import { addImport } from '~/utils/vendorExtensions';

/**
 * Processes the x-ts-request-context and adds the @RequestContext
 */
export const processXTsRequestContext = (
  group: CGCodegenOperationGroup,
  operation: CGCodegenOperation,
) => {
  if (operation.vendorExtensions[X_TS_REQUEST_CONTEXT] && isServer()) {
    const extension = operation.vendorExtensions[
      'x-ts-request-context'
    ] as string;
    const fileName = extension.split('/').pop() as string;
    addImport(group.vendorExtensions, {
      name: fileName,
      path: extension,
    });
    operation.vendorExtensions[X_TS_REQUEST_CONTEXT] = fileName;
  }
};
