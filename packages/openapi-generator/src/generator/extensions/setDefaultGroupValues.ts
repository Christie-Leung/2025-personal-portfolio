import { CodegenOperationGroup } from '@openapi-generator-plus/types/src/types';
import {
  CGCodegenOperationGroup,
  CLI,
  X_IS_DEFAULT,
  X_TS_IMPORTS,
} from '~/types';
import { toArray } from '~/utils/objects';

const setDefaultGroupValues = (cli: CLI, group: CodegenOperationGroup) => {
  group.operations.forEach((operation) => {
    (group as CGCodegenOperationGroup).vendorExtensions = {
      [X_TS_IMPORTS]: [],
    };

    if (!operation.vendorExtensions) {
      operation.vendorExtensions = {};
    }
    if (!operation.vendorExtensions[X_TS_IMPORTS]) {
      operation.vendorExtensions[X_TS_IMPORTS] = [];
    }

    if (!operation.defaultResponse) {
      // If there is no default response, we will see if another response code has been manually set as default
      toArray(operation.responses).forEach(([response]) => {
        if (response?.vendorExtensions?.[X_IS_DEFAULT]) {
          operation.defaultResponse = response;
        }
      });

      // If still no defaultResponse, then throw an exception
      if (!operation.defaultResponse) {
        throw new Error('default response is required');
      }
    }

    if (!operation.defaultResponse.vendorExtensions) {
      operation.defaultResponse.vendorExtensions = {};
    }

    toArray(operation.responses).forEach(([response]) => {
      if (!response.vendorExtensions) {
        response.vendorExtensions = {};
      }
    });
  });
};

export default setDefaultGroupValues;
