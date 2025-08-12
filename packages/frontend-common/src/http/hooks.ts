import { useState, useEffect } from 'react';
import { ErrorHttpResult, HttpResult } from './client';
import { Page } from '@2025-personal-portfolio/common/src/paging'

enum Direction {
  Forward = 1,
  Backward = -1,
}

type UseHttpOptions<A> = {
  initArgs?: A;
  immediateCall?: boolean;
  ignoreStatusCodes?: number[];
};

const defaultOptions = {};

const isPageStructure = <T>(data: unknown): data is Page<T> => {
  return (
    data !== null &&
    typeof data === 'object' &&
    'result' in data &&
    'metadata' in data
  );
};

const isPageRequest = (
  arg: unknown,
): arg is { filters: { pageToken: string } } => {
  return arg !== null && typeof arg === 'object' && 'filters' in arg;
};

/**
 * Hook for using the Http Library
 * @param fetcher the http caller
 * @param options the optional parameters
 */
export const useHttp = <A, O>(
  fetcher: (arg: A) => Promise<HttpResult<O>>,
  options: UseHttpOptions<A> = defaultOptions,
) => {
  const [data, setData] = useState<O | null>(null);
  const [args, setArgs] = useState<A | null>(null);
  const [succeeded, setSucceeded] = useState<boolean>(false);
  const [status, setStatus] = useState<number>(0);
  const [error, setError] = useState<ErrorHttpResult | null>(null);
  const [calling, setCalling] = useState<boolean>(false);
  const [callingMore, setCallingMore] = useState<boolean>(false);

  /**
   * Internal fetch function
   * @param callArg
   * @param direction
   */
  const fetch = async (callArg: A, direction?: Direction) => {
    setCalling(true);
    setArgs(callArg);

    const forward = direction === Direction.Forward;
    const backward = direction === Direction.Backward;
    if (backward) {
      throw new Error('Backward is not implemented');
    }

    const result = await fetcher({
      ...callArg,
    });

    setStatus(result.status);
    setSucceeded(result.succeeded);
    if (result.succeeded) {
      if (isPageStructure(result.payload) && !callArg) {
        // @ts-ignore
        setArgs({ filters: { pageSize: result.payload.metadata.pageSize } });
      }

      if (forward && isPageStructure(result.payload) && isPageStructure(data)) {
        data.result = data.result.concat(result.payload.result);
        data.metadata = result.payload.metadata;
        setData(data);
      } else {
        setData(result.payload);
      }

      setCalling(false);
      return result;
    }

    setError(result.payload);
    setCalling(false);

    return result;
  };

  /**
   * Fetches the next page if the data is a page
   */
  const nextPage = async () => {
    if (args === null || data === null) {
      throw new Error('No data has been called yet - cannot fetch next now.');
    }
    if (!isPageRequest(args) || !isPageStructure(data)) {
      throw new Error('Hook is not in page structure');
    }

    setCallingMore(true);
    await fetch(
      {
        ...args,
        filters: {
          ...args.filters,
          pageToken: data.metadata.nextPageToken,
        },
      },
      Direction.Forward,
    );
    setCallingMore(false);
  };

  /**
   * Regular call function
   * @param arg
   */
  const call = async (arg: A) => {
    setError(null);
    return fetch(arg);
  };

  useEffect(() => {
    if (calling || error || data || !options.immediateCall) {
      return;
    }

    // @ts-ignore - we don't care about the promise
    call(options?.initArgs);
  }, [calling, error]);

  return {
    call,
    succeeded,
    data,
    error: options?.ignoreStatusCodes?.includes(status) ? null : error,
    calling,
    nextPage,
    callingMore,
  };
};
