import { CodegenObjectSchema } from '@openapi-generator-plus/types/src/types';
import { toArray } from '~/utils/objects';
import { isServer } from '~/utils/generatorType';
import {
  CGCodegenVendorExtensions,
  X_TS_EXTRA_ANNOTATIONS,
  XImports,
} from '~/types';
import { addImport } from '~/utils/vendorExtensions';

/**
 * Handles the {@link CodegenObjectSchema} schema object
 */
export const processExtraAnnotations = (schema: CodegenObjectSchema) => {
  if (schema?.vendorExtensions?.[X_TS_EXTRA_ANNOTATIONS] && isServer()) {
    const annotations = schema.vendorExtensions[
      X_TS_EXTRA_ANNOTATIONS
    ] as string[];
    const newAnnotations: string[] = [];

    annotations.forEach((type) => {
      const importName = /[^/]*$/.exec(type)?.[0].replace(/\.[^/.]+$/, '');
      if (importName) {
        const item: XImports = {
          path: type.replace(/\.[^/.]+$/, ''),
          name: importName,
        };
        newAnnotations.push(importName);

        addImport(schema.vendorExtensions as CGCodegenVendorExtensions, item);
      }
    });

    schema.vendorExtensions[X_TS_EXTRA_ANNOTATIONS] = newAnnotations;
  }

  toArray(schema.properties).forEach(([properties]) => {
    if (properties?.vendorExtensions?.[X_TS_EXTRA_ANNOTATIONS] && isServer()) {
      const annotations = properties.vendorExtensions[
        X_TS_EXTRA_ANNOTATIONS
      ] as string[];
      const newAnnotations: string[] = [];

      annotations.forEach((type) => {
        const importName = /[^/]*$/.exec(type)?.[0].replace(/\.[^/.]+$/, '');
        if (importName) {
          const item: XImports = {
            path: type.replace(/\.[^/.]+$/, ''),
            name: importName,
          };
          if (item.path !== importName) {
            newAnnotations.push(importName);

            addImport(
              schema.vendorExtensions as CGCodegenVendorExtensions,
              item,
            );
          }
        }
      });

      properties.vendorExtensions['x-ts-extra-annotations'] = newAnnotations;
    }
  });
};
