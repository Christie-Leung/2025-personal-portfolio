import {
  CodegenGeneratorConstructor,
  CodegenGeneratorType,
} from '@openapi-generator-plus/types';
import typescriptGenerator, {
  options as typescriptGeneratorOptions,
  TypeScriptGeneratorContext,
} from '@openapi-generator-plus/typescript-generator-common';
import {
  CodegenDocument,
  CodegenGeneratorHelper,
  CodegenObjectSchema,
} from '@openapi-generator-plus/types/src/types';
import { createTSContext } from '../context';
import templates from '../templates';
import {
  CGCodegenGenerator,
  CGCodegenNamedSchema,
  CGCodegenOperationGroup,
} from '~/types';
import * as extensions from './extensions';

const generatorConstructor: CodegenGeneratorConstructor<
  TypeScriptGeneratorContext
> = (config, baseContext): CGCodegenGenerator => {
  config.dateApproach = 'native';
  const context = createTSContext(baseContext);
  const generatorOptions = typescriptGeneratorOptions(config, context);

  context.additionalExportTemplates = templates(generatorOptions);
  const base = typescriptGenerator(config, context);

  const generator: CGCodegenGenerator = {
    ...base,
    ...extensions,
    toNativeType: (options) => {
      if (options.format === 'date') {
        return new context.NativeType('Date', {
          serializedType: 'string',
        });
      }

      return base.toNativeType(options);
    },
    toNativeObjectType: (options) => {
      const { scopedName } = options;
      if (scopedName.length !== 1) {
        throw new Error('Only single scoped are supported');
      }

      return new context.NativeType(
        context.generator().toClassName(scopedName[0]),
      );
    },
    postProcessDocument: (
      doc: CodegenDocument,
      helper: CodegenGeneratorHelper,
    ) => {
      if (base.postProcessDocument) {
        base.postProcessDocument(doc, helper);
      }

      const cli = { generator, helper };
      // eslint-disable-next-line guard-for-in
      for (const key in doc.schemas) {
        const schema = doc.schemas[key] as CGCodegenNamedSchema;

        // Set default fields
        generator.setDefaultSchemaValues(cli, schema);
        if (schema.type === 'object') {
          (schema as unknown as CodegenObjectSchema).parents?.map((s) =>
            generator.setDefaultSchemaValues(cli, s),
          );
        }
        if (schema?.properties) {
          Object.values(schema.properties).forEach((s) => {
            generator.setDefaultSchemaValues(cli, s.schema);
          });
        }
        if (schema?.composes?.length) {
          schema.composes.forEach((s) =>
            generator.setDefaultSchemaValues(cli, s),
          );
        }

        generator.processSchema(cli, schema as CGCodegenNamedSchema);
      }

      for (const group of doc.groups) {
        generator.setDefaultGroupValues(cli, group);
        generator.processGroup(cli, group as CGCodegenOperationGroup);
      }
    },
    templateRootContext: () => {
      return {
        ...base.templateRootContext(),
        ...generatorOptions,
        generatorClass: '@2025-personal-portfolio/openapi',
      };
    },
    generatorType: () => CodegenGeneratorType.SERVER,
  };

  return generator;
};

export default generatorConstructor;
