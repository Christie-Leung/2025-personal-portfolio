import { HandlebarHelper2 } from '~/types';

export const ifStarts: HandlebarHelper2<string, string> = {
  name: 'ifStarts',
  callback: (obj, key, options) => {
    if (!obj) {
      return options.inverse(null);
    }

    if (obj.startsWith(key)) {
      return options.fn(obj);
    }

    return options.inverse(obj);
  },
};
