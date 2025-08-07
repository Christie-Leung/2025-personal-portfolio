import { CGCodegenNamedSchema, X_TS_TYPE, XImports } from '~/types';
import { addImport } from '~/utils/vendorExtensions';

/**
 * Processes the x-ts-type extension
 */
export const processXTsType = (
  schema: CGCodegenNamedSchema,
  child?: CGCodegenNamedSchema,
) => {
  const type = schema.vendorExtensions[X_TS_TYPE] as string;
  const importName = /[^/]*$/.exec(type)?.[0].replace(/\.[^/.]+$/, '');

  if (importName) {
    const item: XImports = {
      path: type.replace(/\.[^/.]+$/, ''),
      name: importName,
    };

    addImport(schema.vendorExtensions, item);
    if (child) {
      addImport(child.vendorExtensions, item);
    }
  }
};
