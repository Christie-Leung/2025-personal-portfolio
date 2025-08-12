import { useDecorators } from '@tsed/core';
import * as DateUtils from '@2025-personal-portfolio/common/dist/utils/DateUtils';
import { idUtils } from '@2025-personal-portfolio/common/dist/utils';
import { Id } from '@2025-personal-portfolio/common/dist/ids';
import { ColumnOptions } from 'typeorm/decorator/options/ColumnOptions';
import { Column } from 'typeorm';

function serializeMeta(meta: unknown): unknown {
  if (meta === null || meta === undefined) {
    return meta;
  }

  if (Array.isArray(meta)) {
    return meta.map((item) => serializeMeta(item));
  }
  if (typeof meta === 'object') {
    const serializedObject: Record<string, unknown> = {};

    for (const [key, value] of Object.entries(meta)) {
      if (value instanceof Id) {
        // Handle Id instances
        serializedObject[key] = value.getValue();
      } else if (value instanceof Date) {
        // Handle Date instances
        serializedObject[key] = value.toISOString();
      } else {
        serializedObject[key] = serializeMeta(value);
      }
    }

    return serializedObject;
  }

  return meta;
}

function deserializeMeta(meta: unknown): unknown {
  if (meta === null || meta === undefined) {
    return meta;
  }

  if (Array.isArray(meta)) {
    return meta.map((item) => deserializeMeta(item));
  }
  if (typeof meta === 'object') {
    const deserializedObject: Record<string, unknown> = {};

    for (const [key, value] of Object.entries(meta)) {
      if (typeof value === 'string' && Id.looksLikeId(value)) {
        deserializedObject[key] = idUtils.fromHex(value);
      } else if (DateUtils.isDateString(value)) {
        // Handle Date strings
        deserializedObject[key] = new Date(value);
      } else {
        deserializedObject[key] = deserializeMeta(value);
      }
    }

    return deserializedObject;
  }

  return meta;
}

/**
 * Annotation to serialize and deserialize JSON objects
 * @returns
 */
export function JSONObjectColumn(options: ColumnOptions) {
  const clonedOptions = {
    ...options,
  };
  clonedOptions.transformer = {
    to: (value: unknown) => serializeMeta(value),
    from: (value: unknown) => deserializeMeta(value),
  };

  return useDecorators(
    Column({
      ...clonedOptions,
      type: 'json',
    }),
  );
}
