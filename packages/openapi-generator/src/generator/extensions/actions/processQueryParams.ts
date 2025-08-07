import {
  CGCodegenOperation,
  CGCodegenOperationGroup,
  CGCodegenSchema,
  X_TS_IMPORTS,
} from '~/types';
import { toArray } from '~/utils/objects';
import { addImport } from '~/utils/vendorExtensions';

/**
 * Processes the query parameters
 */
export const processQueryParams = (
  group: CGCodegenOperationGroup,
  operation: CGCodegenOperation,
) => {
  toArray(operation.queryParams).forEach(([queryParam]) => {
    const schema = queryParam.schema as CGCodegenSchema;
    if (schema.vendorExtensions) {
      schema.vendorExtensions[X_TS_IMPORTS].forEach((item) =>
        addImport(group.vendorExtensions, {
          name: item.name,
          path: `${group.relativePath}/models/${item.path
            .replace(/^\./, '')
            .replace(/^\//, '')}`,
        }),
      );
    } else if (
      schema.schemaType === 'ARRAY' &&
      schema.component?.schema.vendorExtensions &&
      schema.component.schema.vendorExtensions[X_TS_IMPORTS] instanceof Array
    ) {
      schema.component.schema.vendorExtensions[X_TS_IMPORTS].forEach(
        (item: { name: string; path: string }) =>
          addImport(group.vendorExtensions, {
            name: item.name,
            path: `${group.relativePath}/models/${item.path
              .replace(/^\./, '')
              .replace(/^\//, '')}`,
          }),
      );
    }
  });
};
