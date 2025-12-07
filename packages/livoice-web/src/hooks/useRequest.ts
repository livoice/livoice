import { useEffect, useState, useRef, useCallback } from 'react';

type UseRequestResult<T = string> = {
  data: T;
  isLoading: boolean;
  error?: Error;
};

const useRequest = <T = string>(url: string): UseRequestResult<T> => {
  const [data, setData] = useState<T | undefined>(undefined);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | undefined>(undefined);
  const abortControllerRef = useRef<AbortController | null>(null);

  const fetchData = useCallback(async () => {
    abortControllerRef.current?.abort();

    const abortController = new AbortController();
    abortControllerRef.current = abortController;

    setIsLoading(true);
    setError(undefined);

    try {
      const response = await fetch(url, { signal: abortController.signal });
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

      const text = await response.text();
      setData(text as T);
    } catch (err) {
      const isError = err instanceof Error && err.name !== 'AbortError';
      isError && setError(err);
    } finally {
      !abortController.signal.aborted && setIsLoading(false);
    }
  }, [url]);

  useEffect(() => {
    void fetchData();

    return () => {
      abortControllerRef.current?.abort();
    };
  }, [fetchData]);

  return {
    data: data as T,
    isLoading,
    error
  };
};

export default useRequest;
