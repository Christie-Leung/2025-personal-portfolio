import { CodegenDocument } from '@openapi-generator-plus/types';
import Handlebars from 'handlebars';
import path from 'path';
import { emit } from '@openapi-generator-plus/handlebars-templates';
import { CGCodegenOperationGroup, CGCodegenOptionsTypeScript } from '~/types';

const generateClients = (options: CGCodegenOptionsTypeScript) => {
  return async (
    outputPath: string,
    doc: CodegenDocument,
    hbs: typeof Handlebars,
    rootContext: Record<string, unknown>,
  ) => {
    const { relativeSourceOutputPath } = options;
    const basePath = path.join(outputPath, relativeSourceOutputPath, 'clients');

    for (const group of doc.groups as CGCodegenOperationGroup[]) {
      if (group.operations.length === 0) {
        continue;
      }

      if (group.path.startsWith('/internal')) {
        continue;
      }

      const clientLocation = path.join(
        outputPath,
        relativeSourceOutputPath,
        'clients',
        group.dir,
        `${group.name}.client.ts`,
      );
      group.relativePath = path.relative(clientLocation, basePath);

      await emit(
        'clients/client',
        clientLocation,
        {
          ...rootContext,
          ...doc,
          generatorType: options.generatorType,
          groups: [group],
        },
        true,
        hbs,
      );

      const hooksLocation = path.join(
        outputPath,
        relativeSourceOutputPath,
        'clients',
        group.dir,
        `${group.name}.hooks.ts`,
      );
      group.relativePath = path.relative(hooksLocation, basePath);

      await emit(
        'clients/hooks',
        hooksLocation,
        {
          ...rootContext,
          ...doc,
          generatorType: options.generatorType,
          groups: [group],
        },
        true,
        hbs,
      );
    }
  };
};

export default generateClients;
