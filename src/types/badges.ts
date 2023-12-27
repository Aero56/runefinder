export enum BadgeType {
  Supporter = 'supporter',
  Inferno = 'inferno',
  Maxed = 'maxed',
}

export interface Badge {
  id: number;
  name: BadgeType;
}
