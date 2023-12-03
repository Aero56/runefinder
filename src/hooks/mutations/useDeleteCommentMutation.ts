import { useMutation } from '@tanstack/react-query';

import { supabase } from 'api/supabase';

const useDeleteCommentMutation = () => {
  return useMutation(async (id: number) => {
    const { data, error } = await supabase
      .from('comments')
      .delete()
      .eq('id', id);

    if (error) {
      throw new Error(error.message);
    }

    return data;
  });
};

export default useDeleteCommentMutation;
