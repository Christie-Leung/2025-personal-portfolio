import { HandlebarHelper2 } from '~/types';

export const ifEquals: HandlebarHelper2<unknown, unknown> = {
  name: 'ifEquals',
  callback: (obj, key, options) => {
    if (obj === key) {
      return options.fn(obj);
    }

    return options.inverse(obj);
  },
};
