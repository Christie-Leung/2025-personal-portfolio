import { CodegenDocument } from '@openapi-generator-plus/types';
import Handlebars from 'handlebars';
import path from 'path';
import { emit } from '@openapi-generator-plus/handlebars-templates';
import { CGCodegenOperationGroup, CGCodegenOptionsTypeScript } from '~/types';

const generateApis = (options: CGCodegenOptionsTypeScript) => {
  return async (
    outputPath: string,
    doc: CodegenDocument,
    hbs: typeof Handlebars,
    rootContext: Record<string, unknown>,
  ) => {
    const { relativeSourceOutputPath } = options;
    const basePath = path.join(outputPath, relativeSourceOutputPath, 'apis');

    doc.groups = doc.groups.filter((group) => group.operations.length > 0);
    for (const group of doc.groups as CGCodegenOperationGroup[]) {
      if (group.operations.length === 0) {
        continue;
      }

      const handlerLocation = path.join(
        outputPath,
        relativeSourceOutputPath,
        'apis',
        group.dir,
        `${group.name}.handler.ts`,
      );
      group.relativePath = path.relative(handlerLocation, basePath);

      await emit(
        'apis/handler',
        handlerLocation,
        {
          ...rootContext,
          ...doc,
          generatorType: options.generatorType,
          groups: [group],
        },
        true,
        hbs,
      );

      const controllerLocation = path.join(
        outputPath,
        relativeSourceOutputPath,
        'apis',
        group.dir,
        `${group.name}.controller.ts`,
      );

      await emit(
        'apis/controller',
        controllerLocation,
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

    const indexLocation = path.join(
      outputPath,
      relativeSourceOutputPath,
      'apis/index.ts',
    );
    // emit the index.ts
    await emit(
      'apis/index',
      indexLocation,
      {
        ...rootContext,
        ...doc,
        generatorType: options.generatorType,
        groups: doc.groups,
      },
      true,
      hbs,
    );
  };
};

export default generateApis;
