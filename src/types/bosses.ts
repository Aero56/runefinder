export interface Bosses {
  theatreOfBlood: IBoss;
  theatreOfBloodHardMode: IBoss;
  tombsOfAmascut: IBoss;
  tombsOfAmascutExpertMode: IBoss;
  chambersOfXeric: IBoss;
  chambersOfXericChallengeMode: IBoss;
  tzKalZuk: IBoss;
  nex: IBoss;
  kreeArra: IBoss;
  generalGraardor: IBoss;
  commanderZilyana: IBoss;
  krilTsutsaroth: IBoss;
  nightmare: IBoss;
  corporealBeast: IBoss;
  kingBlackDragon: IBoss;
  zalcano: IBoss;
  wintertodt: IBoss;
  tempoross: IBoss;
}

interface IBoss {
  rank: number | null;
  score: number | null;
}

export enum Boss {
  Nex = 4,
  KreeArra = 5,
  GeneralGraardor = 6,
  CommanderZilyana = 7,
  KrilTsutsaroth = 8,
  Nightmare = 9,
  CorporealBeast = 13,
  KingBlackDragon = 14,
  Zalcano = 15,
  Wintertodt = 16,
  Tempoross = 17,
}
