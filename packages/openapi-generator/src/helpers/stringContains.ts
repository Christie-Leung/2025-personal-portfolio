import { HandlebarHelper2 } from '~/types';

export const stringContains: HandlebarHelper2<string, string> = {
  name: 'stringContains',
  callback: (str, key, options) => {
    if (!str) {
      return options.inverse(str);
    }

    if (str.includes(key)) {
      return options.fn(str);
    }

    return options.inverse(str);
  },
};
