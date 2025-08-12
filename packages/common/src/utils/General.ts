import sortBy from 'lodash.sortby';
import isEqual from 'lodash.isequal';
import debounce from 'lodash.debounce';
import startcase from 'lodash.startcase';
import get from 'lodash.get';

export const OmitKeys = <T, K extends keyof T>(
  Class: new () => T,
  keys: K[],
): new () => Omit<T, (typeof keys)[number]> => Class;

/**
 * Hash a string to a base36 string of a given length
 */
export const hashString = (input: string, len: number) => {
  if (input.length === 0) {
    return '0'.repeat(len);
  }

  let hash = 0;
  // eslint-disable-next-line no-plusplus
  for (let i = 0; i < input.length; i++) {
    const char = input.charCodeAt(i);
    // eslint-disable-next-line no-bitwise
    hash = (hash << 5) - hash + char;
    // eslint-disable-next-line no-bitwise
    hash |= 0;
  }

  let hashBase36 = Math.abs(hash).toString(36);
  while (hashBase36.length < len) {
    hashBase36 = `0${hashBase36}`;
  }
  if (hashBase36.length > len) {
    hashBase36 = hashBase36.slice(0, len);
  }

  return hashBase36;
};


/**
 * Check if two arrays are equal
 * @param arr1
 * @param arr2
 */
export const arraysAreEqual = (arr1: object[], arr2: object[]) => {
  if (arr1.length !== arr2.length) {
    return false;
  }

  // Sort the arrays by a consistent property
  const sortedArr1 = sortBy(arr1, Object.keys(arr1[0]));
  const sortedArr2 = sortBy(arr2, Object.keys(arr2[0]));

  return isEqual(sortedArr1, sortedArr2);
};

interface Difference {
  path: string;
  value1: unknown;
  value2: unknown;
}

/**
 * Compare two objects and return the differences
 * @param obj1
 * @param obj2
 */
export const compareObjects = (
  obj1: unknown,
  obj2: unknown,
): { isEqual: boolean; differences: Difference[] } => {
  function normalizeValue(value: unknown): unknown {
    if (
      value === undefined ||
      value === null ||
      value === '' ||
      (typeof value === 'object' && Object.keys(value).length === 0)
    ) {
      return null;
    }
    return value;
  }

  const differences: Difference[] = [];

  // @ts-ignore
  function findDifferences(o1: any, o2: any, path = '') {
    // If both values are null or undefined, they are considered equal
    if (o1 === null && o2 === null) {
      return;
    }
    if (o1 === undefined && o2 === undefined) {
      return;
    }

    // If only one of the values is null or undefined, they are different
    if (o1 === null || o2 === null || o1 === undefined || o2 === undefined) {
      differences.push({ path, value1: o1, value2: o2 });
      return;
    }

    const keys = new Set([...Object.keys(o1), ...Object.keys(o2)]);

    keys.forEach((key) => {
      const newPath = path ? `${path}.${key}` : key;
      const val1 = normalizeValue(o1[key]);
      const val2 = normalizeValue(o2[key]);

      if (!isEqual(val1, val2)) {
        if (typeof val1 === 'object' && typeof val2 === 'object') {
          findDifferences(val1, val2, newPath);
        } else {
          differences.push({ path: newPath, value1: val1, value2: val2 });
        }
      }
    });
  }

  findDifferences(obj1, obj2);

  return {
    isEqual: differences.length === 0,
    differences,
  };
};

export const sleep = (ms: number) => {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
};

export { isEqual, sortBy, debounce, startcase, get };
