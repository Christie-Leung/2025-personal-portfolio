import * as path from 'path';
import { CLI, CGCodegenOperationGroup, CGCodegenOperation } from '~/types';
import {
  processPathParams,
  processQueryParams,
  processRequestBody,
  processResponseBody,
  processSecurityContext,
  processXTsRequestContext,
  processXTsUseHook,
} from './actions';
import { processXTSCache } from '~/generator/extensions/actions/processXTSCache';

const longestPath = (urls: string[]) => {
  let prefix = urls.reduce((acc, str) => (str.length < acc.length ? str : acc));
  for (const url of urls) {
    while (url.slice(0, prefix.length) !== prefix) {
      prefix = prefix.slice(0, -1);
    }
  }

  return prefix.replace(/\/$/, '');
};

const titleCase = (value: string): string => {
  if (!value) {
    return '';
  }

  return value.substring(0, 1).toUpperCase() + value.substring(1).toLowerCase();
};

/**
 * Extracts the common path, and moves it up to the top of the controller
 * @param group
 */
const fixPath = (group: CGCodegenOperationGroup) => {
  const paths = group.operations.map((o) => o.path);
  const commonPath = longestPath(paths);
  group.operations.forEach((operation: CGCodegenOperation) => {
    operation.mimeType =
      operation.defaultResponse?.produces?.[0]?.mimeType ?? 'application/json';
    operation.httpMethod = titleCase(operation.httpMethod);
    operation.path = operation.path.replace(commonPath, '');
  });
  group.mimeType = group.operations?.[0].mimeType;
  group.path = commonPath;
};

/**
 * Processes each {@link CGCodegenOperationGroup}
 */
const processGroup = (cli: CLI, group: CGCodegenOperationGroup) => {
  fixPath(group);

  group.operations.forEach((operation: CGCodegenOperation) => {
    operation.hasArgs =
      operation.pathParams !== null ||
      operation.queryParams !== null ||
      operation.requestBody !== null;

    group.relativePath = '';
    if (operation.tags?.length === 1) {
      // Set the directory to generate the controllers at
      const parts = operation.tags[0].split('.');
      group.dir = parts.join('/');

      // And set the relative path to the root apis
      group.relativePath = `${path.relative(group.dir, '').split(path.sep).join('/')}/..`;
    } else {
      group.dir = '/';
    }

    if (operation.tags) {
      group.tags = operation.tags;
    }

    processRequestBody(group, operation);
    processXTsUseHook(group, operation);
    processXTSCache(operation);
    processXTsRequestContext(group, operation);
    processSecurityContext(group, operation);
    processResponseBody(cli, group, operation);
    processPathParams(group, operation);
    processQueryParams(group, operation);
  });
};

export default processGroup;
