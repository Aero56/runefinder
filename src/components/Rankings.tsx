import { Bosses } from 'types/bosses';
import { Stats } from 'types/stats';

interface RankingsProps {
  stats: Stats;
}

const RANKINGS: { [key in keyof Bosses]: { label: string } } = {
  theatreOfBlood: { label: 'Theatre of Blood' },
  theatreOfBloodHardMode: { label: 'Theatre of Blood (Hard mode)' },
  chambersOfXeric: { label: 'Chambers of Xeric' },
  chambersOfXericChallengeMode: { label: 'Chambers of Xeric (Challenge mode)' },
  tombsOfAmascut: { label: 'Tombs of Amascut' },
  tombsOfAmascutExpertMode: { label: 'Tombs of Amascut (Expert mode)' },
};

const Rankings = ({ stats }: RankingsProps) => {
  const rankings = Object.entries(RANKINGS).map(([key, ranking]) => {
    const boss = stats.bosses[key as keyof Bosses];

    if (!boss || boss.score === -1) {
      return null;
    }

    return (
      <div
        key={key}
        className="w-full rounded-xl border-2 border-black-pearl-800 bg-black-pearl-950 p-4 sm:w-auto"
      >
        <p className="font-bold">{ranking.label}</p>
        <p>Kills: {boss.score}</p>
        <p className="badge badge-primary mt-2 font-semibold">#{boss.rank}</p>
      </div>
    );
  });

  return (
    <div className="col-span-1 rounded-xl bg-black-pearl-900 sm:col-span-5">
      <div className="flex items-center justify-between rounded-t-xl border-b-2 border-black-pearl-700 bg-black-pearl-800 p-4 font-semibold">
        Rankings
      </div>
      <div className="w-full">
        <div className="p-4">
          {rankings.filter(Boolean).length ? (
            <div className="flex flex-wrap gap-2">{rankings}</div>
          ) : (
            <p className="p-4 text-center text-black-pearl-200/40">
              This player is not ranked on anything yet.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Rankings;
