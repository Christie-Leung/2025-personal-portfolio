import { HandlebarHelper } from '~/types';

export const json: HandlebarHelper<object> = {
  name: 'json',
  callback: (str) => {
    return JSON.stringify(str);
  },
};
