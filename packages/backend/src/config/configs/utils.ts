/**
 * Fetches the process.env parameter key otherwise throws an error
 * @param key
 */
export const getRequiredEnv = <T>(key: string): T => {
  const value = process.env[key];
  if (!value) {
    throw new Error(`Required environment variable ${key} was not found`);
  }

  return value as T;
};

/**
 * Fetches the process.env parameter key if found
 * @param key
 */
export const getOptionalEnv = <T>(key: string): T | null => {
  const value = process.env[key];
  if (!value) {
    return null;
  }

  return value as T;
};
