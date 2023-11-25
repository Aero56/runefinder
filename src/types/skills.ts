export interface Skills {
  magic: Skill;
  attack: Skill;
  hunter: Skill;
  mining: Skill;
  prayer: Skill;
  ranged: Skill;
  slayer: Skill;
  agility: Skill;
  cooking: Skill;
  defence: Skill;
  farming: Skill;
  fishing: Skill;
  overall: Skill;
  crafting: Skill;
  herblore: Skill;
  smithing: Skill;
  strength: Skill;
  thieving: Skill;
  fletching: Skill;
  hitpoints: Skill;
  firemaking: Skill;
  woodcutting: Skill;
  construction: Skill;
  runecraft: Skill;
}

export interface Skill {
  level: number;
  rank: number;
  xp: number;
}
