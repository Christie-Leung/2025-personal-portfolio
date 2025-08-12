import { useDecorators } from '@tsed/core';
import { Column } from 'typeorm';
import { ColumnOptions } from 'typeorm/decorator/options/ColumnOptions';

/**
 * Annotation to denote a column as nullable. This is a wrapper on top of the {@link Column} with the property nullable set to true
 * @param options the other {@link ColumnOptions}
 */
export function NullableColumn(options?: ColumnOptions) {
  return useDecorators(Column({ ...options, nullable: true }));
}
