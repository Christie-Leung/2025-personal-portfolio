import { HandlebarHelper } from '~/types';

export const isArray: HandlebarHelper<unknown> = {
  name: 'isArray',
  callback: (obj, options) => {
    if (Array.isArray(obj)) {
      return options.fn(obj);
    }

    return options.inverse(obj);
  },
};
