import { v4 } from 'uuid';

const possible = '01234567890abcdef';

/**
 * Generates a random hex
 * @param length
 */
export const generateRandomHex = (length: number) => {
  let rand = '';
  for (let i = 0; i < length; i += 1) {
    rand += possible.charAt(Math.floor(Math.random() * possible.length));
  }

  return rand;
};

/**
 * Fetch a random number between min and max
 * @param min the min value to generate
 * @param max the max value to generate
 */
export const generateRandomNumber = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

/**
 * Generates a random string
 */
export const uuidV4 = () => v4();
