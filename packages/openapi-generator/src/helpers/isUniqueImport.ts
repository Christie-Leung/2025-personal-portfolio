import { CodegenProperty } from '@openapi-generator-plus/types';
import { HandlebarHelper2, X_TS_IMPORTS, XImports } from '~/types';

export const isUniqueImport: HandlebarHelper2<CodegenProperty, string> = {
  name: 'isUniqueImport',
  callback: (property, name, options) => {
    if (!property.schema.vendorExtensions?.[X_TS_IMPORTS]) {
      return options.fn(property);
    }

    if (!options.data.root.schemas[name].imported) {
      options.data.root.schemas[name].imported = [];
    }

    const existing = options.data.root.schemas[name].imported as XImports[];
    const newImports = property.schema.vendorExtensions[
      X_TS_IMPORTS
    ] as XImports[];

    const alreadyImported = existing.find((i1) =>
      newImports.some((i2) => i1.name === i2.name),
    );
    options.data.root.schemas[name].imported = [...existing, ...newImports];

    if (alreadyImported) {
      return options.inverse(property);
    }

    return options.fn(property);
  },
};
