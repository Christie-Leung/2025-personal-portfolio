import { HelperOptions } from 'handlebars';
import {
  CodegenDiscriminator,
  CodegenDiscriminatorValue,
  CodegenGenerator,
  CodegenGeneratorHelper,
  CodegenNamedSchema,
  CodegenProperties,
} from '@openapi-generator-plus/types';
import {
  CodegenContent,
  CodegenOperation,
  CodegenOperationGroup,
  CodegenResponse,
  CodegenSchema,
  CodegenVendorExtensions,
} from '@openapi-generator-plus/types/src/types';
import { CodegenOptionsTypeScript } from '@openapi-generator-plus/typescript-generator-common';

export type HandlebarHelper<I1> = {
  name: string;
  callback: (input1: I1, options: HelperOptions) => string;
};

export type HandlebarHelper2<I1, I2> = {
  name: string;
  callback: (input1: I1, input2: I2, options: HelperOptions) => string;
};

export type HandlebarHelper3<I1, I2, I3> = {
  name: string;
  callback: (
    input1: I1,
    input2: I2,
    input3: I3,
    options: HelperOptions,
  ) => string;
};

export type XImports = {
  path: string;
  name: string;
};

export type XSecurity = {
  signupAccess?: boolean;
  roles?: string[];
  withHost?: boolean;
  internal?: boolean;
  featureFlags?: string[];
};

export type XCache = {
  cache: boolean;
  expire?: string;
  ttl?: number;
};

export type CGCodegenType = 'server' | 'client' | 'frontend';
export type CGCodegenOptionsTypeScript = CodegenOptionsTypeScript & {
  generatorType: CGCodegenType;
};

export const X_TS_VIEWS = 'x-ts-views';
export const X_TS_TYPE = 'x-ts-type';
export const X_TS_PAGE_TYPE = 'x-ts-page-type';
export const X_TS_CONTEXT = 'x-ts-context';
export const X_TS_REQUEST_CONTEXT = 'x-ts-request-context';
export const X_TS_AUTH_CONTEXT = 'x-ts-auth-context';
export const X_TS_AUTHENTICATED = 'x-ts-authenticated';
export const X_TS_EXTRA_ANNOTATIONS = 'x-ts-extra-annotations';
export const X_TS_USE_HOOK = 'x-ts-use-hook';
export const X_TS_IMPORTS = 'x-ts-imports';
export const X_TS_SECURITY = 'x-ts-security';
export const X_IS_DEFAULT = 'x-is-default';
export const X_TS_SKIP = 'x-ts-skip';
export const X_TS_CACHE = 'x-ts-cache';
export const X_TS_ERROR = 'x-ts-error';

export type CGCodegenVendorExtensions = {
  [X_TS_ERROR]?: string;
  [X_TS_VIEWS]?: string;
  [X_TS_TYPE]?: string;
  [X_TS_PAGE_TYPE]?: string;
  [X_TS_CONTEXT]?: string;
  [X_TS_REQUEST_CONTEXT]?: string;
  [X_TS_AUTH_CONTEXT]?: string;
  [X_TS_AUTHENTICATED]?: string;
  [X_TS_SECURITY]?: XSecurity;
  [X_TS_EXTRA_ANNOTATIONS]?: string[];
  [X_TS_USE_HOOK]?: string[];
  [X_TS_IMPORTS]: XImports[];
  [X_IS_DEFAULT]?: boolean;
  [X_TS_SKIP]?: boolean;
  [X_TS_CACHE]?: XCache;
};

export type CGCodegenNamedSchema = CodegenNamedSchema & {
  vendorExtensions: CodegenVendorExtensions & CGCodegenVendorExtensions;
  composes?: CodegenSchema[];
  properties?: CodegenProperties;
  discriminator?: CodegenDiscriminator;
  discriminatorValues?: CodegenDiscriminatorValue[];
};

export type CGCodegenContent = CodegenContent & {
  schema: CGCodegenSchema;
};

export type CGCodegenResponse = CodegenResponse & {
  vendorExtensions: CGCodegenVendorExtensions;
  defaultContent?: CGCodegenContent;
};

export type CGCodegenOperation = CodegenOperation & {
  mimeType: string;
  hasArgs: boolean;
  vendorExtensions: CGCodegenVendorExtensions;
  defaultResponse: CGCodegenResponse;
};

export type CGCodegenOperationGroup = CodegenOperationGroup & {
  dir: string;
  mimeType: string;
  relativePath: string;
  tags: string[];
  operations: CGCodegenOperation[];
  vendorExtensions: CGCodegenVendorExtensions;
};

export type CGCodegenSchema = CodegenSchema & {
  vendorExtensions: CGCodegenVendorExtensions;
};

export type CLI = {
  generator: CGCodegenGenerator;
  helper: CodegenGeneratorHelper;
};

export type CGCodegenGenerator = CodegenGenerator & {
  setDefaultSchemaValues: (cli: CLI, schema: CodegenSchema) => void;
  setDefaultGroupValues: (cli: CLI, group: CodegenOperationGroup) => void;
  processSchema: (cli: CLI, schema: CGCodegenNamedSchema) => void;
  processGroup: (cli: CLI, group: CGCodegenOperationGroup) => void;
};
