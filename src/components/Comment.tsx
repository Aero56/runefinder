import { TrashIcon } from '@heroicons/react/24/outline';
import { format } from 'date-fns';
import toast from 'react-hot-toast/headless';
import { Link } from 'react-router-dom';

import queryClient from 'api/queryClient';
import { useAuth } from 'contexts/AuthContext';
import useDeleteCommentMutation from 'hooks/mutations/useDeleteCommentMutation';
import { Comment as CommentType } from 'hooks/queries/useCommentsQuery';

interface CommentProps {
  comment: CommentType;
  userId: string;
}

const Comment = ({ comment, userId }: CommentProps) => {
  const { user } = useAuth();

  const { mutateAsync: deleteComment, isLoading: isDeleteLoading } =
    useDeleteCommentMutation();

  const handleDelete = async (id: number) => {
    try {
      await deleteComment(id);
    } catch (error) {
      if (error instanceof Error) {
        toast(error.message);
        return;
      }
    }

    toast('Comment deleted!');
    queryClient.invalidateQueries(['comments', userId]);
  };

  const isCommentMe = comment.commenter.id === user?.id;

  return (
    <div key={comment.id} className="mt-4 rounded-lg bg-black-pearl-950 p-4">
      <div className="flex justify-between">
        <div className="mb-2 flex flex-wrap items-baseline">
          <Link
            to={`/player/${comment.commenter.id}`}
            className="mr-1 font-medium text-anzac-400 hover:underline"
          >
            {comment.commenter.username}
          </Link>
          {isCommentMe && <p className="mr-1 text-sm text-gray-600">(You)</p>}
          <p className="text-xs text-black-pearl-100">
            {format(new Date(comment.created_at), 'P p')}
          </p>
        </div>
        {isCommentMe && (
          <button
            className="btn btn-circle btn-ghost btn-sm"
            onClick={() => handleDelete(comment.id)}
          >
            {!isDeleteLoading ? (
              <TrashIcon className="h-4 w-4" />
            ) : (
              <span className="loading loading-spinner"></span>
            )}
          </button>
        )}
      </div>
      <p className="break-words">{comment.comment}</p>
    </div>
  );
};

export default Comment;
