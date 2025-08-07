import { HandlebarHelper2 } from '~/types';

export const ifNotEquals: HandlebarHelper2<unknown, unknown> = {
  name: 'ifNotEquals',
  callback: (obj, key, options) => {
    if (obj === key) {
      return options.inverse(obj);
    }

    return options.fn(obj);
  },
};
