import { CGCodegenResponse, HandlebarHelper } from '~/types';
import { vendorExtensionUtils } from '~/utils';

export const isPaginated: HandlebarHelper<CGCodegenResponse> = {
  name: 'isPaginated',
  callback: (response, options) => {
    if (vendorExtensionUtils.isPaginatedResponse(response)) {
      return options.fn(response.vendorExtensions['x-ts-page-type']);
    }

    if (
      !response.defaultContent ||
      !response.defaultContent?.schema?.nativeType?.serializedType
    ) {
      return options.inverse('void');
    }

    if (response.defaultContent.schema.nativeType.serializedType === 'string') {
      return options.inverse('String');
    }

    return options.inverse(
      response.defaultContent.schema.nativeType.serializedType,
    );
  },
};
