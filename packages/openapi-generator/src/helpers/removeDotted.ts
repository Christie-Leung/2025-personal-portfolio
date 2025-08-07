import { HandlebarHelper2 } from '~/types';

export const removeDotted: HandlebarHelper2<string, string> = {
  name: 'removeDotted',
  callback: (literal, value) => {
    if (!literal || !value) {
      return '';
    }

    const data = literal.replace(`.${value}`, '').trim();
    if (data !== null) {
      return data;
    }

    return '';
  },
};
