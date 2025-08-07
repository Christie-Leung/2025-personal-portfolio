import {
  CGCodegenOperation,
  CGCodegenOperationGroup,
  CGCodegenSchema,
  CLI,
  X_TS_IMPORTS,
  X_TS_PAGE_TYPE,
} from '~/types';
import { addImport, isPaginatedResponse } from '~/utils/vendorExtensions';

/**
 * Processes the response body
 */
export const processResponseBody = (
  cli: CLI,
  group: CGCodegenOperationGroup,
  operation: CGCodegenOperation,
) => {
  if (operation?.defaultResponse?.defaultContent?.schema?.scopedName) {
    const { schema } = operation.defaultResponse.defaultContent;

    (schema as CGCodegenSchema).vendorExtensions[X_TS_IMPORTS].forEach(
      (item) => {
        if (item.path.startsWith('./')) {
          addImport(group.vendorExtensions, {
            name: item.name,
            path: `${group.relativePath}/models/${item.path
              .replace(/^\./, '')
              .replace(/^\//, '')}`,
          });
        } else {
          addImport(group.vendorExtensions, {
            ...item,
          });
        }
      },
    );
  }

  if (
    operation?.defaultResponse?.defaultContent?.schema?.schemaType === 'ARRAY'
  ) {
    const schema =
      operation.defaultResponse.defaultContent.schema.component?.schema;

    (schema as CGCodegenSchema).vendorExtensions[X_TS_IMPORTS].forEach(
      (item) => {
        if (item.path.startsWith('./')) {
          addImport(group.vendorExtensions, {
            name: item.name,
            path: `${group.relativePath}/models/${item.path
              .replace(/^\./, '')
              .replace(/^\//, '')}`,
          });
        } else {
          addImport(group.vendorExtensions, {
            ...item,
          });
        }
      },
    );
  }

  if (isPaginatedResponse(operation.defaultResponse)) {
    // This is paginated response. Add the import
    const schema = cli.helper.findSchema(
      operation.defaultResponse.vendorExtensions[X_TS_PAGE_TYPE] as string,
      null,
    );

    if (schema) {
      (schema as CGCodegenSchema).vendorExtensions[X_TS_IMPORTS].forEach(
        (item) => {
          addImport(group.vendorExtensions, {
            name: item.name,
            path: `${group.relativePath}/models/${item.path
              .replace(/^\./, '')
              .replace(/^\//, '')}`,
          });
        },
      );
    }
  }
};
