import { useDecorators } from '@tsed/core';
import { OnDeserialize, OnSerialize } from '@tsed/json-mapper';
import { CollectionOf } from '@tsed/schema';
import { idUtils } from '@2025-personal-portfolio/common/dist/utils';

/**
 * Annotation to define a property as the type {@link Id}
 * @returns
 */
export function ArrayIdProperty() {
  return useDecorators(
    CollectionOf(String),
    OnDeserialize((id) => {
      if (id && Array.isArray(id)) {
        return id.map((i) => idUtils.fromHex(i));
      }

      return [];
    }),
    OnSerialize((id) => {
      if (id && Array.isArray(id)) {
        return id.map((i) => i.getValue());
      }

      return [];
    }),
  );
}
