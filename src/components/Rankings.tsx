import PlayerRankingsSkeleton from './LoadingSkeletons/PlayerRankingsSkeleton';

import { Bosses } from 'types/bosses';
import { Tables } from 'types/supabase';

interface RankingsProps {
  stats?: Tables<'statistics'>;
  isLoading: boolean;
}

const RANKINGS: { [key in keyof Partial<Bosses>]: { label: string } } = {
  tzKalZuk: { label: 'Inferno' },
  tzTokJad: { label: 'Jad' },
  theatreOfBlood: { label: 'Theatre of Blood' },
  theatreOfBloodHardMode: { label: 'Theatre of Blood (Hard mode)' },
  chambersOfXeric: { label: 'Chambers of Xeric' },
  chambersOfXericChallengeMode: { label: 'Chambers of Xeric (Challenge mode)' },
  tombsOfAmascut: { label: 'Tombs of Amascut' },
  tombsOfAmascutExpertMode: { label: 'Tombs of Amascut (Expert mode)' },
  generalGraardor: { label: 'General Graardor' },
  commanderZilyana: { label: 'Commander Zilyana' },
  krilTsutsaroth: { label: "K'ril Tsutsaroth" },
  kreeArra: { label: "Kree'arra" },
  nightmare: { label: 'The Nightmare' },
  phosanisNightmare: { label: "Phosani's Nightmare" },
  corporealBeast: { label: 'Corporeal Beast' },
  kingBlackDragon: { label: 'King Black Dragon' },
  zalcano: { label: 'Zalcano' },
  wintertodt: { label: 'Wintertodt' },
  tempoross: { label: 'Tempoross' },
};

const Rankings = ({ stats, isLoading }: RankingsProps) => {
  const rankings = Object.entries(RANKINGS).map(([key, ranking]) => {
    const boss = stats?.bosses[key as keyof Bosses];

    if (!boss?.score) {
      return null;
    }

    return (
      <div
        key={key}
        className="w-full min-w-48 rounded-xl border-2 border-black-pearl-800 bg-black-pearl-950 p-4 sm:w-auto"
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
      {stats && !isLoading ? (
        <div className="w-full">
          <div className="p-4">
            {rankings.filter(Boolean).length ? (
              <>
                <div className="flex flex-col justify-evenly gap-2 xs:flex-row">
                  <div className="flex flex-col items-center">
                    <h2 className="font-semibold">Overall score</h2>
                    <p className="text-4xl font-bold text-anzac-400">
                      {stats.raid_score + stats.boss_score}
                    </p>
                  </div>
                  <div className="divider m-0 xs:divider-horizontal" />
                  <div className="flex flex-col items-center">
                    <h2 className="font-semibold">Raid score</h2>
                    <p className="text-4xl font-bold text-anzac-400">
                      {stats.raid_score}
                    </p>
                  </div>
                  <div className="divider m-0 xs:divider-horizontal" />
                  <div className="flex flex-col items-center">
                    <h2 className="font-semibold">Boss score</h2>
                    <p className="text-4xl font-bold text-anzac-400">
                      {stats.boss_score}
                    </p>
                  </div>
                </div>
                <div className="divider my-4 mt-2 xs:mt-4" />
                <div className="flex flex-wrap gap-2">{rankings}</div>
              </>
            ) : (
              <p className="p-4 text-center text-black-pearl-200/40">
                This player is not ranked on anything yet.
              </p>
            )}
          </div>
        </div>
      ) : (
        <PlayerRankingsSkeleton />
      )}
    </div>
  );
};

export default Rankings;
