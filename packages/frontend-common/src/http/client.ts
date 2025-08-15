
import { config } from '../config';
import cache from './cache';
import { Id } from '@2025-personal-portfolio/common/src/ids';
import { idUtils } from '@2025-personal-portfolio/common/src/utils';
import { HeaderConstants } from '@2025-personal-portfolio/common/src/constants';

type RequestMethod = 'GET' | 'POST' | 'DELETE';
type RequestHeaders = Record<string, string>;
type RequestBody = unknown;

export type ValidationErrorHttpResult = {
  message: string;
  status: 422;
  name: string;
  errors: string[];
  messages: string[];
};

export type ErrorHttpResult = {
  message: string;
  status: number;
  name: string;
  errors: unknown[];
  messages: string[];
};

type HttpResultSuccess<T> = {
  status: number;
  succeeded: true;
  payload: T;
};

type GenericHttpResultFailed = {
  status: number;
  succeeded: false;
  payload: ErrorHttpResult;
};

type ValidationHttpResultFailed = {
  status: 422;
  succeeded: false;
  payload: ValidationErrorHttpResult;
};

export type HttpResult<T> =
  | HttpResultSuccess<T>
  | GenericHttpResultFailed
  | ValidationHttpResultFailed;

export const HttpResult = Symbol.for("HttpResult");

type Request = RequestInit & {
  headers: Headers;
};

type RequestCache = {
  expireKey?: string;
  key?: string;
  ttl?: number;
};

type MakeRequestOption = {
  auth?: {
    required: boolean;
    verifiedUser?: boolean;
  };
  body?: RequestBody;
  headers?: RequestHeaders;
  cache?: RequestCache;
};

type GetRequestOption = {
  auth?: {
    required: boolean;
    verifiedUser?: boolean;
  };
  cache?: RequestCache;
  headers?: RequestHeaders;
};

type PostRequestOption = {
  auth?: {
    required: boolean;
    verifiedUser?: boolean;
  };
  cache?: RequestCache;
  body?: RequestBody;
  headers?: RequestHeaders;
};

type DeleteRequestOption = {
  auth?: {
    required: boolean;
    verifiedUser?: boolean;
  };
  body?: RequestCache;
  headers?: RequestHeaders;
};

const deserialize = <T>(str: string): T => {
  if (str === undefined || str === null || str === '') {
    return {} as T;
  }

  return JSON.parse(str, (_, value) => {
    if (Id.looksLikeId(value)) {
      return idUtils.fromHex(value);
    }

    return value;
  }) as T;
};

const serialize = (obj: unknown): string => {
  return JSON.stringify(obj, (_, value) => {
    if (value instanceof Id) {
      return value.getValue();
    }

    return value;
  });
};

/**
 * Makes an HTTP request
 * @param uri the request uri
 * @param method the request method
 * @param requestOption the {@link MakeRequestOption} to make the request
 * @returns
 */
const make = async <T>(
  uri: string,
  method: RequestMethod,
  requestOption: MakeRequestOption,
): Promise<HttpResult<T>> => {
  if (method === 'GET' && requestOption?.cache?.key) {
    const cached = cache.get(requestOption.cache.key, uri);
    if (cached) {
      return cached as HttpResult<T>;
    }
  }

  const options: Request = {
    method,
    mode: 'cors',
    credentials: 'include',
    headers: requestOption.headers
      ? new Headers(requestOption.headers)
      : new Headers(),
  };
  // @ts-ignore
  // eslint-disable-next-line no-underscore-dangle
  options.headers.set(HeaderConstants.I_WEB_VERSION, window?.__app?.version);
  // @ts-ignore
  // eslint-disable-next-line no-underscore-dangle
  options.headers.set(HeaderConstants.I_WEB_HASH, window?.__app?.hash);

  if (requestOption.body) {
    options.headers.set(HeaderConstants.CONTENT_TYPE, 'application/json');
    options.body = serialize(requestOption.body);
  }

  const url = `${config.apiHost}/${uri.replace(/^\/+/g, '')}`;
  try {
    const response = await fetch(url, options);

    // No matter what, expire the cache
    if (requestOption.cache?.expireKey) {
      cache.expire(requestOption.cache.expireKey);
    }

    if (response.status >= 200 && response.status < 300) {
      const str = await response.text();
      const result = {
        status: response.status,
        succeeded: true,
        payload: deserialize(str || '{}'),
      };

      // Set the cache
      if (requestOption.cache?.key && method === 'GET') {
        cache.set(
          requestOption.cache.key,
          uri,
          result,
          requestOption.cache.ttl,
        );
      }

      return result as HttpResult<T>;
    }

    const payload = (await response.json()) as ErrorHttpResult;
    if (!payload.messages) {
      payload.messages = [payload.message];
    }

    if (response.status === 422) {
      const validationPayload = payload as ValidationErrorHttpResult;
      validationPayload.messages = validationPayload.errors.map(
        (e) => e,
      );
      return {
        status: response.status,
        succeeded: false,
        payload: validationPayload,
      };
    }

    if (response.status === 400) {
      // @ts-ignore
      if (payload.errors?.[0]?.dataPath) {
        const validationPayload = payload as ValidationErrorHttpResult;
        validationPayload.messages = validationPayload.errors.map(
          (e) => e,
        );
        return {
          status: response.status,
          succeeded: false,
          payload: validationPayload,
        };
      }
    }

    return {
      status: response.status,
      succeeded: false,
      payload,
    };
  } catch (e) {
    return {
      status: 500,
      succeeded: false,
      payload: e as ErrorHttpResult,
    };
  }
};

type InterpolatePathOptions = {
  keys?: Record<string, unknown>;
  queries?: Record<string, unknown>;
};

export const http = {
  /**
   * Makes a GET call
   * @param uri  the uri to make a request to
   * @param options the {@link GetRequestOption}
   * @returns
   */
  get: <T>(uri: string, options?: GetRequestOption): Promise<HttpResult<T>> =>
    make(uri, 'GET', { ...options }),

  /**
   * Makes a POST call
   * @param uri  the uri to make a call to
   * @param options  the {@link PostRequestOption
   * @returns
   */
  post: <T>(uri: string, options: PostRequestOption): Promise<HttpResult<T>> => 
    make(uri, 'POST', { ...options }),

  /**
   * Makes a DELETE call
   * @param uri  the uri to make a request to
   * @param options the {@link DeleteRequestOption}
   * @returns
   */
  delete: <T>(
    uri: string,
    options?: DeleteRequestOption,
  ): Promise<HttpResult<T>> => make(uri, 'DELETE', { ...options }),

  open: (uri: string) => {
    // eslint-disable-next-line no-restricted-globals
    location.href = `${config.apiHost}/${uri.replace(/^\/+/g, '')}`;
  },

  /**
   * interpolates the given url with the given keys
   */
  interpolatePath: (str: string, options: InterpolatePathOptions) => {
    const { keys, queries } = options;

    if (keys) {
      Object.keys(keys).forEach((key) => {
        str = str.replace(`{${key}}`, String(keys[key]));
      });
    }

    if (queries) {
      Object.entries(queries).forEach(([query, value], index) => {
        const char = index === 0 ? '?' : '&';
        str += `${char}${query}=${value}`;
      });
    }

    return str;
  },
  
};
