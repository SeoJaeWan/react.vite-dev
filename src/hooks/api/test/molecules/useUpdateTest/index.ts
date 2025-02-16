import { POST } from '@/api/indext';
import { useMutation } from '@tanstack/react-query';
import { useRefetchTest } from '../../query/useTest';

interface UpdateTestProps {
  id: number;
  title: string;
}

const updateTest = (body: UpdateTestProps) => {
  return POST(`/test`, body);
};

export const useUpdateTest = () => {
  const mutation = useMutation({ mutationFn: updateTest });
  const refetchTest = useRefetchTest();

  const successSubmit = (callback: () => void) => () => {
    refetchTest();
    callback();
  };

  const submit = (
    body: UpdateTestProps,
    onSuccess: () => void,
    onError: () => void,
  ) => {
    mutation.mutate(body, {
      onSuccess: successSubmit(onSuccess),
      onError,
    });
  };

  return submit;
};
