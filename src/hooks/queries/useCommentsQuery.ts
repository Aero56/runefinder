import { useQuery } from '@tanstack/react-query';

import { supabase } from 'api/supabase';
import { Tables } from 'types/supabase';

export const RECORD_LIMIT = 10;

export interface Comment
  extends Omit<Tables<'comments'>, 'commenter_id' | 'user_id'> {
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
        .range(offset - RECORD_LIMIT, offset - 1)
        .returns<Comment[]>();

      return { comments: data, count };
    },
    { keepPreviousData: true },
  );
};

export default useCommentsQuery;
