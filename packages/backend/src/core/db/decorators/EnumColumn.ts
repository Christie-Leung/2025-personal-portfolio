import { useDecorators } from '@tsed/core';
import { Column } from 'typeorm';
import { ColumnOptions } from 'typeorm/decorator/options/ColumnOptions';

export type EnumColumnOptions = ColumnOptions & {
  enum: (string | number)[] | Record<string, string | number>;
  default?: unknown;
};

const transformer = (defaultValue?: unknown) => ({
  to: (data: string[]) => {
    if (!data && defaultValue) {
      return defaultValue;
    }

    return data.join(',');
  },
  from: (data: string) => {
    if (!data && defaultValue) {
      return [defaultValue];
    }
    return data.split(',');
  },
});

/**
 * Annotation to define a column as type {@link Id}
 * @param options
 * @returns
 */
export function EnumColumn(options: EnumColumnOptions): PropertyDecorator {
  const clonedOptions: EnumColumnOptions = {
    ...options,
  };
  if (options.array) {
    clonedOptions.transformer = transformer(options.default);
  }

  return useDecorators(
    Column({
      ...clonedOptions,
      type: 'varchar',
    }),
  );
}
