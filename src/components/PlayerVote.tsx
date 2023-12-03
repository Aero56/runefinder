import { ArrowDownIcon, ArrowUpIcon } from '@heroicons/react/24/outline';
import toast from 'react-hot-toast/headless';

import queryClient from '@api/queryClient';
import { useAuth } from '@contexts/AuthContext';
import usePlayerVoteMutation from '@hooks/mutations/usePlayerVoteMutation';
import usePlayerTotalVotesQuery from '@hooks/queries/usePlayerTotalVotesQuery';
import usePlayerVoteQuery from '@hooks/queries/usePlayerVoteQuery';


interface PlayerVoteProps {
  playerId: string;
}

const PlayerVote = ({ playerId }: PlayerVoteProps) => {
  const { user } = useAuth();

  const { mutateAsync } = usePlayerVoteMutation();

  const { data: playerVote } = usePlayerVoteQuery(playerId);
  const { data: totalVotes } = usePlayerTotalVotesQuery(playerId);

  const handleVote = async (vote: number) => {
    try {
      await mutateAsync({ playerId, vote }).then(() => {
        queryClient.setQueryData(['playerVote', playerId, user?.id], vote);
        queryClient.invalidateQueries(['playerTotalVotes', playerId]);
      });
    } catch (error) {
      if (error instanceof Error) {
        toast('Something went wrong!');
        return;
      }
    }
  };

  const isPlayerMe = user?.id === playerId;

  return (
    <div className="flex items-center gap-1">
      {!isPlayerMe && (
        <button
          className={`btn btn-circle btn-ghost btn-sm ${
            playerVote === 1 ? 'btn-active' : ''
          }`}
          onClick={() => handleVote(playerVote === 1 ? 0 : 1)}
        >
          <ArrowUpIcon className="h-5 w-5" />
        </button>
      )}
      <p
        className={`${
          totalVotes && totalVotes > 0
            ? 'text-green-500'
            : totalVotes && totalVotes < 0
            ? 'text-red-500'
            : ''
        }`}
      >
        {totalVotes ?? 0}
      </p>
      {!isPlayerMe && (
        <button
          className={`btn btn-circle btn-ghost btn-sm ${
            playerVote === -1 ? 'btn-active' : ''
          }`}
          onClick={() => handleVote(playerVote === -1 ? 0 : -1)}
        >
          <ArrowDownIcon className="h-5 w-5" />
        </button>
      )}
    </div>
  );
};

export default PlayerVote;
