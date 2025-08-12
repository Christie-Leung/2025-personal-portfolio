import { useDecorators } from '@tsed/core';
import { OnDeserialize, OnSerialize } from '@tsed/json-mapper';
import { Property } from '@tsed/schema';
import { idUtils } from '@2025-personal-portfolio/common/dist/utils';
import { Id } from '@2025-personal-portfolio/common/dist/ids';

/**
 * Annotation to define a property as the type {@link Id}
 * @returns
 */
export function IdProperty() {
  return useDecorators(
    Property(String),
    OnDeserialize((id) => {
      if (id) {
        return idUtils.fromHex(id);
      }
      return null;
    }),
    OnSerialize((id) => {
      if (id) {
        if (id instanceof Id) {
          return id.getValue();
        }

        return id;
      }

      return null;
    }),
  );
}
