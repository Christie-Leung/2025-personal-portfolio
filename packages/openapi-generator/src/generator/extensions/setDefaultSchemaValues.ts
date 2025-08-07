import { CodegenNamedSchema } from '@openapi-generator-plus/types';
import { CodegenObjectSchema } from '@openapi-generator-plus/types/src/types';
import { CLI, X_TS_IMPORTS } from '~/types';
import { toArray } from '~/utils/objects';

const setDefaultSchemaValues = (cli: CLI, schema: CodegenNamedSchema) => {
  if (!schema.vendorExtensions) {
    schema.vendorExtensions = {};
  }
  if (!schema.vendorExtensions[X_TS_IMPORTS]) {
    schema.vendorExtensions[X_TS_IMPORTS] = [];
  }

  if (schema.type === 'object') {
    const objSchema = schema as CodegenObjectSchema;
    toArray(objSchema.properties).forEach(([properties]) => {
      if (!properties.vendorExtensions) {
        properties.vendorExtensions = {};
      }
    });
  }
};

export default setDefaultSchemaValues;
