import { useDecorators } from '@tsed/core';
import { IdColumnOptions, IdColumn } from '~/core/db/decorators/IdColumn';

export type PrimaryIdColumnOptions = Omit<IdColumnOptions, 'primary'>;

const requiredOptions = {
  primary: true,
};

/**
 * Annotations to define a column as primary and of type {@link Id};
 * @param options
 * @returns
 */
export function PrimaryIdColumn(
  options?: PrimaryIdColumnOptions,
): PropertyDecorator {
  return useDecorators(IdColumn({ ...options, ...requiredOptions }));
}
