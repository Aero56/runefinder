export interface Bosses {
  theatreOfBlood: Boss;
  theatreOfBloodHardMode: Boss;
  tombsOfAmascut: Boss;
  tombsOfAmascutExpertMode: Boss;
  chambersOfXeric: Boss;
  chambersOfXericChallengeMode: Boss;
}

interface Boss {
  rank: number;
  score: number;
}
