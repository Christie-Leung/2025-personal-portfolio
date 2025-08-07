import { CGCodegenOperation, CGCodegenOperationGroup, XImports } from '~/types';
import { addImport } from '~/utils/vendorExtensions';

/**
 * Processes the request body and adds the imports
 */
export const processRequestBody = (
  group: CGCodegenOperationGroup,
  operation: CGCodegenOperation,
) => {
  // Request param
  if (operation?.requestBody?.schema?.name) {
    addImport(group.vendorExtensions, {
      name: operation.requestBody.schema.name,
      path: `${group.relativePath}/models/${operation.requestBody.schema.name}`,
    });
  } else if (
    operation.requestBody?.schema?.schemaType === 'ARRAY' &&
    operation.requestBody?.schema?.component?.schema?.name
  ) {
    addImport(group.vendorExtensions, {
      name: operation.requestBody.schema.component.schema.name,
      path: `${group.relativePath}/models/${operation.requestBody.schema.component.schema.name}`,
    });
  }

  // @ts-ignore
  if (operation.requestBody?.schema?.component?.schema?.discriminator) {
    // This means there will be a plural version of this.
    // so let's also add that as an import
    const item: XImports = {
      path: `./${group.relativePath}/models/${operation.requestBody.schema.component.schema.name}s`,
      name: `${operation.requestBody.schema.component.schema.name}s`,
    };
    addImport(group.vendorExtensions, item);
  }
};
