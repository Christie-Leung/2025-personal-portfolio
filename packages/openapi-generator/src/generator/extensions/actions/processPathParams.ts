import {
  CGCodegenOperation,
  CGCodegenOperationGroup,
  CGCodegenSchema,
  X_TS_IMPORTS,
} from '~/types';
import { toArray } from '~/utils/objects';
import { addImport } from '~/utils/vendorExtensions';

/**
 * Processes the path parameters
 */
export const processPathParams = (
  group: CGCodegenOperationGroup,
  operation: CGCodegenOperation,
) => {
  toArray(operation.pathParams).forEach(([pathParam]) => {
    const schema = pathParam.schema as CGCodegenSchema;
    if (schema.vendorExtensions) {
      schema.vendorExtensions[X_TS_IMPORTS].forEach((item) =>
        addImport(group.vendorExtensions, item),
      );
    }
  });
};
