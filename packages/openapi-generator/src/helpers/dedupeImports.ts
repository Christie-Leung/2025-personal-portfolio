import { HelperOptions } from 'handlebars';
import { CodegenProperties } from '@openapi-generator-plus/types';
import { CodegenSchema } from '@openapi-generator-plus/types/src/types';
import { HandlebarHelper, X_TS_IMPORTS, XImports } from '~/types';

export const dedupeImports: HandlebarHelper<CodegenProperties> = {
  name: 'dedupeImports',
  callback: (properties, options: HelperOptions) => {
    const getImports = (schema?: CodegenSchema): XImports[] => {
      return (schema?.vendorExtensions?.[X_TS_IMPORTS] ?? []) as XImports[];
    };

    const globalImports: XImports[] = [];
    Object.values(properties).forEach((property) => {
      const imports: XImports[] = getImports(property.schema);
      if (property.schema.type === 'array') {
        imports.push(...getImports(property?.schema?.component?.schema));
      }

      globalImports.push(...imports);
    });

    const deduped = globalImports.reduce((acc, curr) => {
      if (!acc.find((x) => x.name === curr.name)) {
        acc.push(curr);
      }
      return acc;
    }, [] as XImports[]);
    return options.fn(deduped);
  },
};
