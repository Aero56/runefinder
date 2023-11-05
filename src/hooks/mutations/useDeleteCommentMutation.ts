import { supabase } from '@api/supabase';
import { useMutation } from '@tanstack/react-query';

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
