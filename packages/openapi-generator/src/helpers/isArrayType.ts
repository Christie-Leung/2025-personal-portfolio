import { HandlebarHelper } from '~/types';

export const isArrayType: HandlebarHelper<string> = {
  name: 'isArrayType',
  callback: (response, options) => {
    if (response.endsWith('[]')) {
      return options.fn(response.substring(0, response.length - 2));
    }

    return options.inverse(response);
  },
};
