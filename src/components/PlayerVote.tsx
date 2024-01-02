import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import queryClient from 'api/queryClient';
import { useAuth } from 'contexts/AuthContext';
import usePlayerVoteMutation from 'hooks/mutations/usePlayerVoteMutation';
import usePlayerTotalVotesQuery from 'hooks/queries/usePlayerTotalVotesQuery';
import usePlayerVoteQuery from 'hooks/queries/usePlayerVoteQuery';

interface PlayerVoteProps {
  playerId: string;
}

const PlayerVote = ({ playerId }: PlayerVoteProps) => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const { mutateAsync } = usePlayerVoteMutation();

  const { data: playerVote } = usePlayerVoteQuery(playerId);
  const { data: totalVotes } = usePlayerTotalVotesQuery(playerId);

  const handleVote = async (vote: number) => {
    if (!user) {
      navigate('?signin');
      return;
    }

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
    <div className="mx-auto flex max-w-xs items-center justify-between gap-4 rounded-xl bg-black-pearl-950 p-3">
      <button
        onClick={() => handleVote(playerVote === -1 ? 0 : -1)}
        className={`bg-center bg-no-repeat hover:bg-overhead ${
          playerVote === -1 ? 'bg-overhead' : ''
        } ${isPlayerMe ? 'pointer-events-none grayscale' : ''}`}
      >
        <img
          src={new URL('../assets/icons/Magic.png', import.meta.url).href}
          className="[image-rendering:pixelated]"
        />
      </button>
      <p
        className={`${
          totalVotes && totalVotes > 0
            ? 'text-green-500'
            : totalVotes && totalVotes < 0
              ? 'text-red-500'
              : ''
        }`}
      >
        {totalVotes ? (totalVotes > 0 ? `+${totalVotes}` : totalVotes) : 0}
      </p>
      <button
        onClick={() => handleVote(playerVote === 1 ? 0 : 1)}
        className={`bg-center bg-no-repeat hover:bg-overhead ${
          playerVote === 1 ? 'bg-overhead' : ''
        } ${isPlayerMe ? 'pointer-events-none grayscale' : ''}`}
      >
        <img
          src={
            new URL('../assets/icons/Dampen_Magic.png', import.meta.url).href
          }
          className="rotate-180 [image-rendering:pixelated]"
        />
      </button>
    </div>
  );
};

export default PlayerVote;
