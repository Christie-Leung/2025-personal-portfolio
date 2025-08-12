import { getDevice } from "@2025-personal-portfolio/common/src/core";

const getFromMeta = (key: string): string => {
  // @ts-ignore
  const match = import.meta.env[key];
  if (match) {
    return match as string;
  }

  throw new Error(`Environment variable ${key} is not defined`);
};

const getEnv = (key: string): string => {
  // @ts-ignore
  // eslint-disable-next-line no-underscore-dangle
  if (window && window.$$config && window.$$config[key]) {
    // @ts-ignore
    // eslint-disable-next-line no-underscore-dangle
    return window.$$config[key];
  }

  return getFromMeta(key);
};

export const getRequiredEnv = (key: string): string => {
  try {
    return getEnv(key);
  } catch (e) {
    if (getDevice() !== 'Mobile') {
      throw e;
    }
    return '';
  }
};

export const getOptionalEnv = (key: string, defaultValue = ''): string => {
  try {
    return getEnv(key);
  } catch {
    return defaultValue;
  }
};
