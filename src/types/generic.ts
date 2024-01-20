import { ActivityType } from './activities';

export const SCREEN_XS = 480;
export const SCREEN_SM = 640;

export interface Activity {
  teamSize: number;
  type: ActivityType;
}
