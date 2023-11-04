import useCommentsQuery from '@hooks/queries/useCommentsQuery';
import { format } from 'date-fns';

interface CommentsProps {
  userId: string;
}

const Comments = ({ userId }: CommentsProps) => {
  const { data: comments } = useCommentsQuery(userId);

  return (
    <div className="col-span-1 rounded-xl bg-black-pearl-900 sm:col-span-5">
      <div className="flex items-center justify-between rounded-t-xl border-b-2 border-black-pearl-700 bg-black-pearl-800 p-4 font-semibold">
        Comments
      </div>

      <div className="flex flex-col p-4">
        <textarea
          className="textarea mb-4 h-14"
          placeholder="Add a comment..."
        />
        {comments?.map((comment) => (
          <div key={comment.id} className="rounded-lg bg-black-pearl-950 p-4">
            <div className="mb-1 flex items-baseline">
              <h1 className="font-medium text-anzac-400">
                {comment.commenter.username}
              </h1>
              <p className="ml-2 text-xs text-black-pearl-100">
                {format(new Date(comment.created_at), 'P p')}
              </p>
            </div>
            <p>{comment.comment}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Comments;
