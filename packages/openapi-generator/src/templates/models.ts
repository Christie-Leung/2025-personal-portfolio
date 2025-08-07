import path from 'path';
import { emit } from '@openapi-generator-plus/handlebars-templates';
import { CodegenDocument } from '@openapi-generator-plus/types';
import Handlebars from 'handlebars';
import { CGCodegenOptionsTypeScript } from '~/types';

const generateSchemas = (options: CGCodegenOptionsTypeScript) => {
  return async (
    outputPath: string,
    doc: CodegenDocument,
    hbs: typeof Handlebars,
    rootContext: Record<string, unknown>,
  ) => {
    const { relativeSourceOutputPath } = options;

    for (const key in doc.schemas) {
      if (!Object.prototype.hasOwnProperty.call(doc.schemas, key)) {
        continue;
      }

      const schema = doc.schemas[key];

      // These are manually defined types - so do not generate them
      if (schema.vendorExtensions?.['x-ts-type']) {
        continue;
      }

      const loc = path.join(
        outputPath,
        relativeSourceOutputPath,
        'models',
        `${key}.ts`,
      );

      await emit(
        'models/index',
        loc,
        {
          ...rootContext,
          ...doc,
          generatorType: options.generatorType,
          schemas: {
            [key]: schema,
          },
        },
        true,
        hbs,
      );
    }
  };
};

export default generateSchemas;
