import { Column, ColumnOptions } from 'typeorm';
import { useDecorators } from '@tsed/core';
import { Id } from '@2025-personal-portfolio/common/dist/ids';
import { idUtils } from '@2025-personal-portfolio/common/dist/utils';

export type IdColumnOptions = Omit<ColumnOptions, 'length'>;

/**
 * Transforms the {@link Id} to and from string to object
 */
const idTransformer = {
  to: (value: Id | null) => {
    if (value instanceof Id) {
      return value.getValue();
    }

    return value;
  },
  from: <T extends Id>(value: Id | string | null): T => {
    if (value) {
      if (value instanceof Id) {
        return value as unknown as T;
      }

      return idUtils.fromHex(value);
    }

    // @ts-ignore
    return null;
  },
};

const requiredOptions = {
  length: 34,
  transformer: idTransformer,
};

/**
 * Annotation to define a column as type {@link Id}
 * @param options
 * @returns
 */
export function IdColumn(options?: IdColumnOptions): PropertyDecorator {
  return useDecorators(Column('varchar', { ...options, ...requiredOptions }));
}
