export interface AllChampions {
  league: Array<LeagueChampion>;
  dota: Array<DotaChampion>;
  overwatch: Array<OverwatchChampion>;
}
export interface LeagueChampion {
  id: string;
  key: string;
  name: string;
}
export interface DotaChampion {
  id: number;
  name: string;
  imageName: string;
}
export interface OverwatchChampion {
  id: string;
  name: string;
  portrait: string;
}
export interface LeagueItemData {
  _id: string;
  id: string;
  name: string;
  description: string;
  plaintext: string;
  gold: number;
  image: string;
  into: [string];
  from: [string];
}
export interface DotaItemData {
  id: number;
  name: string;
  cost: number;
  secret_shop: number;
  side_shop: number;
  recipe: number;
  localized_name: string;
}
export interface LeagueBuildData {
  _id: string;
  creator: UserData;
  items: Array<LeagueItemData>;
  private: boolean;
  createdAt: Date;
  champion: LeagueChampion;
}
export interface UserData {
  email: string;
  username: string;
  favoriteChamps: AllChampions;
}
