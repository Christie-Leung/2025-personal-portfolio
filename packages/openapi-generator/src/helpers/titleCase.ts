import { HandlebarHelper } from '~/types';

export const titleCase: HandlebarHelper<string> = {
  name: 'titleCase',
  callback: (str) => {
    if (!str) {
      return '';
    }
    const result1 = str.replace(/([A-Z])/g, ' $1');
    const result2 = result1.charAt(0).toUpperCase() + result1.slice(1);

    return result2.replaceAll(' ', '');
  },
};
