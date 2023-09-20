export enum Minigame {
  BarbarianAssault,
  FightPit,
  TroubleBrewing,
}

export interface Minigames {
  lms: IMinigame;
}

interface IMinigame {
  rank: number;
  score: number;
}
