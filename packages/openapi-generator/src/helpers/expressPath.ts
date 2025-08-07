import { HandlebarHelper } from '~/types';

export const expressPath: HandlebarHelper<string> = {
  name: 'expressPath',
  callback: (path) => {
    if (!path) {
      return '';
    }

    return path.replaceAll('{', ':').replaceAll('}', '');
  },
};
