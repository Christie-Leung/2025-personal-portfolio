import * as Handlebars from 'handlebars';
import { loadTemplates } from '@openapi-generator-plus/handlebars-templates';
import path from 'path';
import { HandlebarHelper, HandlebarHelper2, HandlebarHelper3 } from '~/types';
import { isArray } from './isArray';
import { ifc } from './ifc';
import { removeDotted } from './removeDotted';
import { isPaginated } from './isPaginated';
import { ifEquals } from './ifEquals';
import { ifNotEquals } from './ifNotEquals';
import { ifStarts } from './ifStarts';
import { lowerCase } from './lowerCase';
import { titleCase } from './titleCase';
import { isUniqueImport } from './isUniqueImport';
import { expressPath } from './expressPath';
import { stringContains } from './stringContains';
import { json } from './json';
import { isArrayType } from './isArrayType';
import { replace } from './replace';
import { ifDefined } from './ifDefined';
import { dedupeImports } from './dedupeImports';

const helpers: (
  | HandlebarHelper<unknown>
  | HandlebarHelper2<unknown, unknown>
  | HandlebarHelper3<unknown, unknown, unknown>
)[] = [
  dedupeImports,
  isArray,
  isArrayType,
  ifc,
  isPaginated,
  ifEquals,
  ifNotEquals,
  ifStarts,
  lowerCase,
  titleCase,
  isUniqueImport,
  expressPath,
  stringContains,
  json,
  removeDotted,
  replace,
  ifDefined,
];

const loadHelpers = async (hbs: typeof Handlebars): Promise<void> => {
  for (const helper of helpers) {
    hbs.registerHelper(helper.name, helper.callback);
  }

  await loadTemplates(path.resolve(__dirname, '../../templates'), hbs);
};
export default loadHelpers;
