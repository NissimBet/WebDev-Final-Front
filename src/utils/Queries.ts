import fetch from 'isomorphic-unfetch';
import cookie from 'js-cookie';
import {
  AllChampions,
  LeagueBuildData,
  LeagueItemData,
  UserData,
  DotaItemData,
} from './DBInterfaces';

type AuthHeadersFunction = (
  _: string
) => {
  credentials: RequestCredentials;
  headers: HeadersInit;
};
const AuthHeaders: AuthHeadersFunction = token => ({
  credentials: 'include',
  headers: {
    Authorization: 'Bearer ' + token,
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
});

type MethodHeaderFunction = (
  method: 'GET' | 'POST' | 'DELETE' | 'PUT',
  token: string
) => {
  credentials: RequestCredentials;
  headers: HeadersInit;
};
const MethodHeaders: MethodHeaderFunction = (method, token) => ({
  ...AuthHeaders(token),
  method: method,
});

export type RemoveFavoriteChampFunction = (
  game: string,
  champId: string | number
) => Promise<boolean>;
export const RemoveFavoriteChamp: RemoveFavoriteChampFunction = async (
  game,
  champId
) => {
  const token = cookie.get('token');
  const deleteStatus = await fetch(
    `${process.env.BACKEND_URL}user/remove-favorite-champ`,
    {
      ...MethodHeaders('POST', token),
      body: JSON.stringify({ game: game, champId: champId as string }),
    }
  );
  if (deleteStatus.status !== 200) {
    return false;
  }
  return true;
};

export type AddFavoriteChampFunction = (
  game: string,
  champId: string | number
) => Promise<boolean>;
export const AddFavoriteChamp: AddFavoriteChampFunction = async (
  game,
  champId
) => {
  const token = cookie.get('token');
  const addStatus = await fetch(
    `${process.env.BACKEND_URL}user/new-favorite-champ`,
    {
      ...MethodHeaders('POST', token),
      body: JSON.stringify({ game: game, champId: champId as string }),
    }
  );
  if (addStatus.status !== 200) {
    return false;
  }
  return true;
};

export type SetLeagueBuildPrivacyFunction = (
  buildId: string,
  privacy: boolean
) => Promise<boolean>;
export const SetLeagueBuildPrivacy: SetLeagueBuildPrivacyFunction = async (
  buildId,
  privacy
) => {
  const token = cookie.get('token');
  const changeStatus = await fetch(
    `${process.env.BACKEND_URL}league/build/privacy`,
    {
      ...MethodHeaders('PUT', token),
      body: JSON.stringify({ private: privacy, buildId: buildId }),
    }
  );
  if (changeStatus.status !== 200) {
    return false;
  }
  return true;
};

export type CreateLeagueBuildFunction = (
  items: Array<string>,
  isPrivate: boolean,
  championId: string
) => Promise<LeagueBuildData>;
export const CreateLeagueBuild: CreateLeagueBuildFunction = async (
  items,
  isPrivate,
  championId
) => {
  const token = cookie.get('token');
  const newBuildData = await fetch(
    `${process.env.BACKEND_URL}league/builds/new`,
    {
      ...MethodHeaders('POST', token),
      body: JSON.stringify({
        items: items,
        private: isPrivate,
        champion: championId,
      }),
    }
  );
  if (newBuildData.status === 200) {
    const newBuildDataJSON = await newBuildData.json();
    return newBuildDataJSON;
  }
  return null;
};

export type RemoveLeagueBuildFunction = (buildId: string) => Promise<boolean>;
export const RemoveLeagueBuild: RemoveLeagueBuildFunction = async buildId => {
  const token = cookie.get('token');
  const removeStatus = await fetch(
    `${process.env.BACKEND_URL}league/builds/delete/${buildId}`,
    {
      ...MethodHeaders('DELETE', token),
    }
  );
  if (removeStatus.status !== 204) {
    return false;
  }
  return true;
};

export type GetUserDataFunction = () => Promise<UserData>;
export const GetUserData: GetUserDataFunction = async () => {
  const token = cookie.get('token');
  const userData = await fetch(`${process.env.BACKEND_URL}user/get-data`, {
    ...AuthHeaders(token),
  });
  if (userData.status === 200) {
    const userDataJSON = await userData.json();
    return userDataJSON;
  }
  return null;
};

export type GetAllChampsFunction = () => Promise<AllChampions>;
export const GetAllChamps: GetAllChampsFunction = async () => {
  const allChampions = await fetch(`${process.env.BACKEND_URL}champs/all`);
  const allChampionsJSON = await allChampions.json();
  return allChampionsJSON;
};

export type GetLeagueItemsFunction = () => Promise<Array<LeagueItemData>>;
export const GetLeagueItems: GetLeagueItemsFunction = async () => {
  const itemsData = await fetch(`${process.env.BACKEND_URL}league/items/last`);
  const itemsDataJSON = await itemsData.json();
  return itemsDataJSON;
};

export type GetDotaItemsFunction = () => Promise<Array<DotaItemData>>;
export const GetDotaItems: GetDotaItemsFunction = async () => {
  const itemsData = await fetch(`${process.env.BACKEND_URL}dota/items`);
  const itemsDataJSON = await itemsData.json();
  return itemsDataJSON;
};

export type GetUserLeagueBuildsFunction = () => Promise<Array<LeagueBuildData>>;
export const GetUserLeagueBuilds: GetUserLeagueBuildsFunction = async () => {
  const token = cookie.get('token');
  const userBuilds = await fetch(
    `${process.env.BACKEND_URL}league/builds/user`,
    {
      ...AuthHeaders(token),
    }
  );
  if (userBuilds.status === 200) {
    const userBuildsJSON = await userBuilds.json();
    return userBuildsJSON;
  }
  return null;
};
