import { HandlebarHelper3 } from '~/types';

export const replace: HandlebarHelper3<string, string, string> = {
  name: 'replace',
  callback: (str: string, term: string, value: string) => {
    return str.replace(term, value);
  },
};
