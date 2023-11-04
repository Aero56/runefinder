import { supabase } from '@api/supabase';
import { useMutation } from '@tanstack/react-query';

interface CommentMutationProps {
  userId: string;
  comment: string;
}

const useCommentMutation = () => {
  return useMutation(async ({ userId, comment }: CommentMutationProps) => {
    const { data, error } = await supabase
      .from('comments')
      .insert({ user_id: userId, comment });

    if (error) {
      throw new Error(error.message);
    }

    return data;
  });
};

export default useCommentMutation;
