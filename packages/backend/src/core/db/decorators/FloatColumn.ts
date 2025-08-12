import { useDecorators } from '@tsed/core';
import { Column } from 'typeorm';
import { ColumnNumericOptions } from 'typeorm/decorator/options/ColumnNumericOptions';

export type NumericColumnOptions = Omit<ColumnNumericOptions, 'transformer'>;

const numericTransfer = {
  to: (data: number) => {
    return data;
  },

  from: (data: string) => {
    return parseFloat(data);
  },
};

const requiredOptions = {
  transformer: numericTransfer,
};

/**
 * Annotation to define a column as type {@link Id}
 * @param options
 * @returns
 */
export function FloatColumn(options?: NumericColumnOptions): PropertyDecorator {
  return useDecorators(Column('numeric', { ...options, ...requiredOptions }));
}
