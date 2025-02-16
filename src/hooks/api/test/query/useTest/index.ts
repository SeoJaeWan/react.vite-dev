import { GET } from '@/api/indext';
import {
  QueryCacheNotifyEvent,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query';
import { useEffect, useState } from 'react';

interface TestProps {
  prams: number;
  query: string;
}

const test = (data: TestProps) => {
  return GET<Test>(`/test/${data.prams}?query=${data.query}`);
};

const TEST_KEY = 'test';

const useTest = (data: TestProps) => {
  const query = useQuery({
    queryKey: [TEST_KEY, data],
    queryFn: () => test(data),
  });

  return query;
};

export const useRefetchTest = () => {
  const queryCLient = useQueryClient();

  const refetching = () => {
    queryCLient.invalidateQueries({
      queryKey: [TEST_KEY],
    });
  };

  return refetching;
};

export const useSubScribeTest = () => {
  const [data, setData] = useState<Test | null>(null);

  const queryClient = useQueryClient();

  useEffect(() => {
    const callback = (event: QueryCacheNotifyEvent) => {
      if (event.query.queryKey[0] === TEST_KEY) {
        setData(event.query.state.data);
      }
    };

    const unsubscribe = queryClient.getQueryCache().subscribe(callback);

    return () => unsubscribe();
  }, [queryClient]);

  return data;
};

export default useTest;
