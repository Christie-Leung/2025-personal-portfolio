import get from 'lodash.get';
import { HandlebarHelper2 } from '~/types';

export const ifc: HandlebarHelper2<unknown, string> = {
  name: 'ifc',
  callback: (obj, key, options) => {
    if (!obj || !key) {
      return options.inverse(null);
    }

    const data = get(obj, key, null);
    if (data !== null) {
      return options.fn(data);
    }

    return options.inverse(null);
  },
};
