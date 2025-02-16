import { GET } from '@/api/indext';
import {
  QueryCacheNotifyEvent,
  useQueries,
  useQueryClient,
} from '@tanstack/react-query';
import { useEffect, useState } from 'react';

type TestsProps = number;

const tests = (data: TestsProps) => {
  return GET<Test>(`/test/${data}`);
};

const TESTS_KEY = 'test';

const useTests = () => {
  const queries = useQueries({
    queries: [
      {
        queryKey: [TESTS_KEY, 1],
        queryFn: () => tests(1),
      },
      {
        queryKey: [TESTS_KEY, 2],
        queryFn: () => tests(2),
      },
      {
        queryKey: [TESTS_KEY, 3],
        queryFn: () => tests(3),
      },
    ],
    combine: (data) => ({
      isLoading: data.some((d) => d.isLoading),
      isError: data.some((d) => d.isError),
      isSuccess: data.every((d) => d.isSuccess),
      data: data.map((d) => d.data).flat(),
    }),
  });

  return queries;
};

export const useRefetchTests = () => {
  const queryCLient = useQueryClient();

  const refetching = () => {
    queryCLient.invalidateQueries({
      queryKey: [TESTS_KEY],
    });
  };

  return refetching;
};

export const useSubScribeTest = () => {
  const [data, setData] = useState<Test[]>([]);

  const queryClient = useQueryClient();

  useEffect(() => {
    const callback = (event: QueryCacheNotifyEvent) => {
      if (event.query.queryKey[0] === TESTS_KEY) {
        const newData = event.query.state.data as Test[] | [];

        setData(newData);
      }
    };

    const unsubscribe = queryClient.getQueryCache().subscribe(callback);

    return () => unsubscribe();
  }, [queryClient]);

  return data;
};

export default useTests;
