import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import Comment from './Comment';
import { DIALOG_SET_USERNAME } from './Dialogs/SetUsername';
import Pagination from './Pagination';

import queryClient from 'api/queryClient';
import { useAuth } from 'contexts/AuthContext';
import useCommentMutation from 'hooks/mutations/useCommentMutation';
import useCommentsQuery, { RECORD_LIMIT } from 'hooks/queries/useCommentsQuery';

const MAX_COMMENT_LENGTH = 500;

interface CommentsProps {
  userId?: string;
}

interface FormData {
  comment: string;
}

const Comments = ({ userId }: CommentsProps) => {
  const { user, data: userData } = useAuth();
  const navigate = useNavigate();

  const [page, setPage] = useState(1);
  const { data, isLoading } = useCommentsQuery(
    { userId: userId!, page },
    { keepPreviousData: true, enabled: !!userId },
  );

  const { mutateAsync: addComment, isLoading: isAddLoading } =
    useCommentMutation();

  const { handleSubmit, register, watch, reset } = useForm<FormData>({
    defaultValues: { comment: '' },
  });

  const onSubmit = async (data: FormData) => {
    if (!user) {
      navigate('?signin');
      return;
    }

    if (!userData?.username) {
      navigate(`?${DIALOG_SET_USERNAME}`);
      return;
    }

    try {
      await addComment({
        userId: userId!,
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

  const handlePageChange = (page: number) => {
    setPage(page);
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
                className={`btn btn-primary btn-sm w-36 ${
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
        {userId && !isLoading ? (
          data?.comments?.length ? (
            data?.comments?.map((comment) => (
              <Comment key={comment.id} comment={comment} userId={userId} />
            ))
          ) : (
            <p className="mt-4 text-center text-black-pearl-200/40">
              This player does not have any comments yet.
            </p>
          )
        ) : (
          [...Array(3)].map((_, index) => (
            <div
              key={index}
              className="skeleton mt-4 h-20 w-full bg-black-pearl-950/60"
            />
          ))
        )}
        {!isLoading && !!data?.count && data.count > RECORD_LIMIT && (
          <div className="mx-auto mt-4">
            <Pagination
              count={data.count}
              limit={RECORD_LIMIT}
              onChange={handlePageChange}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default Comments;
