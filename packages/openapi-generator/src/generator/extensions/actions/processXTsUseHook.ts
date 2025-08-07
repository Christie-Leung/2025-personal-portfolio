import {
  CGCodegenOperation,
  CGCodegenOperationGroup,
  X_TS_USE_HOOK,
} from '~/types';
import { isServer } from '~/utils/generatorType';
import { addImport } from '~/utils/vendorExtensions';

/**
 * Processes the x-ts-use-hook and adds the @Use hook
 */
export const processXTsUseHook = (
  group: CGCodegenOperationGroup,
  operation: CGCodegenOperation,
) => {
  // This is for custom @Use
  if (operation.vendorExtensions[X_TS_USE_HOOK] && isServer()) {
    const newHook: string[] = [];
    operation.vendorExtensions[X_TS_USE_HOOK].forEach((hook) => {
      const name = hook.split('/').pop() as string;
      addImport(group.vendorExtensions, {
        name,
        path: hook,
      });
      newHook.push(name);
    });
    operation.vendorExtensions[X_TS_USE_HOOK] = newHook;
  }
};
