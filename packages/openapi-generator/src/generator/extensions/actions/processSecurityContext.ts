import {
  CGCodegenOperation,
  CGCodegenOperationGroup,
  CGCodegenVendorExtensions,
  X_TS_AUTH_CONTEXT,
  X_TS_AUTHENTICATED,
} from '~/types';
import { isServer } from '~/utils/generatorType';
import { addImport } from '~/utils/vendorExtensions';

/**
 * Processes the security context and adds the @AuthContext
 */
export const processSecurityContext = (
  group: CGCodegenOperationGroup,
  operation: CGCodegenOperation,
) => {
  if (operation.securityRequirements && isServer()) {
    const scheme =
      operation.securityRequirements?.requirements?.[0]?.schemes?.[0]?.scheme;
    if (!scheme) {
      throw new Error('A security scheme is required');
    }

    const vendorExtension =
      scheme.vendorExtensions as CGCodegenVendorExtensions;

    // Add the @AuthContext
    const contextExtension = vendorExtension[X_TS_AUTH_CONTEXT] as string;
    const contextName = contextExtension.split('/').pop() as string;
    addImport(group.vendorExtensions, {
      name: contextName,
      path: contextExtension,
    });
    operation.vendorExtensions['x-ts-auth-context'] = contextName;

    // Add the @Authenticated
    const authExtension = vendorExtension[X_TS_AUTHENTICATED] as string;
    const authName = authExtension.split('/').pop() as string;
    addImport(group.vendorExtensions, {
      name: authName,
      path: authExtension,
    });
    operation.vendorExtensions['x-ts-authenticated'] = authName;
  }
};
