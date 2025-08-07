import { HandlebarHelper } from '~/types';

export const ifDefined: HandlebarHelper<unknown> = {
  name: 'ifDefined',
  callback: (key, options) => {
    if (key) {
      return options.fn(key);
    }

    return options.inverse(key);
  },
};
