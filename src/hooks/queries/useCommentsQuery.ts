import { Table } from '@/types/supabase';
import { supabase } from '@api/supabase';
import { useQuery } from '@tanstack/react-query';

export interface Comment
  extends Omit<Table<'comments'>, 'commenter_id' | 'user_id'> {
  commenter: {
    username: string | null;
  };
}

const useCommentsQuery = (userId: string) => {
  const queryKey = ['comments', userId];

  return useQuery<Comment[] | null>(queryKey, async () => {
    const { data } = await supabase
      .from('comments')
      .select(
        'id, comment, created_at, commenter:users!comments_commenter_id_fkey(username)',
      )
      .eq('user_id', userId)
      .returns<Comment[]>();

    return data;
  });
};

export default useCommentsQuery;
