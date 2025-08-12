/**
 * Check if the given string is a valid URL.
 * @param url
 */
export const isValidUrl = (url: string | null | undefined): boolean => {
  if (!url) {
    return false;
  }

  try {
    // eslint-disable-next-line no-new
    new URL(url);
    return true;
  } catch {
    return false;
  }
};
