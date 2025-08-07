type MapItem<V> = [V, string, number];

/**
 * A mapper for iterating over an object with key => value as the iterator.
 * Converts this into an array of [value, value, index][]
 * Use this as `toArray(object).forEach(([value, key]) => ...)`
 * @param object the object to iterate over
 */
export const toArray = <V>(object: Record<string, V> | null): MapItem<V>[] => {
  if (!object) {
    return [];
  }

  const mapped: MapItem<V>[] = [];
  Object.keys(object).forEach((key, index) => {
    mapped.push([object[key], key, index]);
  });

  return mapped;
};
