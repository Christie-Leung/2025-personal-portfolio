import { HandlebarHelper } from '~/types';

export const lowerCase: HandlebarHelper<string> = {
  name: 'lowerCase',
  callback: (str) => {
    if (!str) {
      return '';
    }
    return str.toLowerCase();
  },
};
