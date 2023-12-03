import { useQuery } from '@tanstack/react-query';

import { Table } from '@/types/supabase';
import { supabase } from '@api/supabase';

export const RECORD_LIMIT = 10;

export interface Comment
  extends Omit<Table<'comments'>, 'commenter_id' | 'user_id'> {
  commenter: {
    id: string;
    username: string | null;
  };
}

interface CommentsQueryProps {
  userId: string;
  page: number;
}

interface CommentsQueryData {
  comments: Comment[] | null;
  count: number | null;
}

const useCommentsQuery = ({ userId, page }: CommentsQueryProps) => {
  const queryKey = ['comments', userId, page];

  const offset = RECORD_LIMIT * page;

  return useQuery<CommentsQueryData>(
    queryKey,
    async () => {
      const { data, count } = await supabase
        .from('comments')
        .select(
          'id, comment, created_at, commenter:users!comments_commenter_id_fkey(id, username)',
          { count: 'exact' },
        )
        .eq('user_id', userId)
        .order('created_at', { ascending: false })
        .range(offset - RECORD_LIMIT, offset)
        .returns<Comment[]>();

      return { comments: data, count };
    },
    { keepPreviousData: true },
  );
};

export default useCommentsQuery;
