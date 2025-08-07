import { CodegenOptionsTypeScript } from '@openapi-generator-plus/typescript-generator-common';
import { CodegenDocument } from '@openapi-generator-plus/types';
import Handlebars from 'handlebars';
import renderModels from './models';
import generateApis from './apis';
import generateClients from './clients';
import { CGCodegenOptionsTypeScript, X_TS_SKIP } from '../types';
import { getGeneratorType } from '~/utils/generatorType';

const templates = (_options: CodegenOptionsTypeScript) => {
  return async (
    outputPath: string,
    doc: CodegenDocument,
    hbs: typeof Handlebars,
    rootContext: Record<string, unknown>,
  ) => {
    const generatorType = getGeneratorType();

    const options: CGCodegenOptionsTypeScript = {
      ..._options,
      generatorType,
    };

    // Ignore the skipped items
    doc.groups.forEach((group) => {
      group.operations = group.operations.filter(
        (o) => o?.vendorExtensions?.[X_TS_SKIP] !== true,
      );
    });

    if (generatorType === 'server') {
      await renderModels(options)(outputPath, { ...doc }, hbs, rootContext);
      await generateApis(options)(outputPath, { ...doc }, hbs, rootContext);
    }

    if (generatorType === 'client') {
      await renderModels(options)(outputPath, { ...doc }, hbs, rootContext);
      await generateClients(options)(outputPath, { ...doc }, hbs, rootContext);
    }

    const routesCount = doc.groups.reduce((total, group) => {
      return total + group.operations.length;
    }, 0);
    const schemaCount = Object.keys(doc.schemas).length;

    // eslint-disable-next-line
    console.log('Generated', routesCount, 'routes');
    // eslint-disable-next-line
    console.log('Generated', schemaCount, 'schemas');
  };
};

export default templates;
