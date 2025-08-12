/**
 * Removes the leading and trailing slashes from the given string
 * @param str
 */
export const trimSlash = (str: string): string => {
  if (!str) {
    return '';
  }

  return str.replace(/^\//, '').replace(/\/$/, '');
};

/**
 * Joins the given uri components into a single uri
 * @param paths
 */
export const joinUriComponents = (...paths: string[]): string => {
  return paths
    .map(trimSlash)
    .map((s) => s.trim())
    .join('/');
};
