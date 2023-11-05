import queryClient from '@api/queryClient';
import useCommentMutation from '@hooks/mutations/useCommentMutation';
import useCommentsQuery from '@hooks/queries/useCommentsQuery';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast/headless';
import Comment from './Comment';

const MAX_COMMENT_LENGTH = 500;

interface CommentsProps {
  userId: string;
}

interface FormData {
  comment: string;
}

const Comments = ({ userId }: CommentsProps) => {
  const { data: comments } = useCommentsQuery(userId);

  const { mutateAsync: addComment, isLoading: isAddLoading } =
    useCommentMutation();

  const { handleSubmit, register, watch, reset } = useForm<FormData>({
    defaultValues: { comment: '' },
  });

  const onSubmit = async (data: FormData) => {
    try {
      await addComment({
        userId: userId,
        comment: data.comment,
      });
    } catch (error) {
      if (error instanceof Error) {
        toast(error.message);
        return;
      }
    }

    reset();
    toast('Comment added!');
    queryClient.invalidateQueries(['comments', userId]);
  };

  const commentField = watch('comment');

  return (
    <div className="col-span-1 rounded-xl bg-black-pearl-900 sm:col-span-5">
      <div className="flex items-center justify-between rounded-t-xl border-b-2 border-black-pearl-700 bg-black-pearl-800 p-4 font-semibold">
        Comments
      </div>

      <div className="flex flex-col p-4">
        <div className="flex flex-col items-end">
          <textarea
            className="textarea h-14 w-full"
            placeholder="Add a comment..."
            {...register('comment', { maxLength: MAX_COMMENT_LENGTH })}
          />

          {!!commentField?.trim() && (
            <div className="mt-4 flex items-center gap-2">
              <p
                className={`text-sm ${
                  commentField.length > MAX_COMMENT_LENGTH ? 'text-red-500' : ''
                }`}
              >{`${commentField.length}/${MAX_COMMENT_LENGTH}`}</p>
              <button
                className={`btn btn-sm w-36 bg-anzac-400 text-black-pearl-950 hover:bg-anzac-300 ${
                  commentField.length > MAX_COMMENT_LENGTH ? 'btn-disabled' : ''
                }`}
                onClick={handleSubmit(onSubmit)}
              >
                {!isAddLoading ? (
                  'Add comment'
                ) : (
                  <span className="loading loading-spinner"></span>
                )}
              </button>
            </div>
          )}
        </div>
        {comments?.map((comment) => (
          <Comment key={comment.id} comment={comment} userId={userId} />
        ))}
      </div>
    </div>
  );
};

export default Comments;
