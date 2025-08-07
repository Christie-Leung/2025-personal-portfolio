import { chainTypeScriptGeneratorContext } from '@openapi-generator-plus/typescript-generator-common';
import path from 'path';
import { TypeScriptGeneratorContext } from '@openapi-generator-plus/typescript-generator-common/src';
import loadHelpers from '~/helpers';

const createContext = (baseContext: TypeScriptGeneratorContext) => {
  const addOns: Partial<TypeScriptGeneratorContext> = {
    loadAdditionalTemplates: loadHelpers,
    additionalWatchPaths: () => {
      return [path.resolve(__dirname, '../templates')];
    },
    defaultNpmOptions: () => ({
      name: '@2025-personal-portfolio/openapi',
      version: '0.0.1',
      private: true,
      repository: null,
    }),
    defaultTypeScriptOptions: () => ({
      target: 'ES2015',
      libs: ['$target', 'DOM'],
    }),
  };

  return chainTypeScriptGeneratorContext(baseContext, addOns);
};

export default createContext;
