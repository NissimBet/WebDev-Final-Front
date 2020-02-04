import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import User from '../../components/User';
import { withAuthSync } from '../../utils/Authentication';
import { NextPage } from 'next';
import cookie from 'js-cookie';
import fetch from 'isomorphic-unfetch';
import { Typography } from '@material-ui/core';

const RemoveFavoriteChamp = async (
  game: string,
  champId: string
): Promise<boolean> => {
  const token = cookie.get('token');
  const deleteStatus = await fetch(
    `${process.env.BACKEND_URL}user/remove-favorite-champ`,
    {
      method: 'POST',
      credentials: 'include',
      headers: {
        Authorization: 'Bearer ' + token,
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ game: game, champId: champId }),
    }
  );
  if (deleteStatus.status !== 200) {
    return false;
  }
  return true;
};

const AddFavoriteChamp = async (
  game: string,
  champId: string
): Promise<boolean> => {
  const token = cookie.get('token');
  const addStatus = await fetch(
    `${process.env.BACKEND_URL}user/new-favorite-champ`,
    {
      method: 'POST',
      credentials: 'include',
      headers: {
        Authorization: 'Bearer ' + token,
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ game: game, champId: champId }),
    }
  );
  if (addStatus.status !== 200) {
    return false;
  }
  return true;
};

const GetAllChamps = async () => {
  const allChampions = await fetch(`${process.env.BACKEND_URL}champs/all`);
  const allChampionsJSON = await allChampions.json();
  return allChampionsJSON;
};

const SetBuildPrivacy = async (buildId: string, privacy: boolean) => {
  const token = cookie.get('token');
  const addStatus = await fetch(
    `${process.env.BACKEND_URL}league/build/privacy`,
    {
      method: 'PUT',
      credentials: 'include',
      headers: {
        Authorization: 'Bearer ' + token,
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ private: privacy, buildId: buildId }),
    }
  );
  if (addStatus.status !== 200) {
    return false;
  }
  return true;
};

const CreateLeagueBuild = async (
  items: Array<string>,
  isPrivate: boolean = true,
  championId: string
) => {
  const token = cookie.get('token');
  const newBuild = await fetch(`${process.env.BACKEND_URL}league/builds/new`, {
    method: 'POST',
    credentials: 'include',
    headers: {
      Authorization: 'Bearer ' + token,
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      items: items,
      private: isPrivate,
      champion: championId,
    }),
  });
  if (newBuild.status === 200) {
    const newBuildData = await newBuild.json();
    return newBuildData;
  } else {
    return null;
  }
};

const RemoveLeagueBuild = async (buildId: string) => {
  const token = cookie.get('token');
  const deleteStatus = await fetch(
    `${process.env.BACKEND_URL}league/builds/delete/${buildId}`,
    {
      method: 'DELETE',
      credentials: 'include',
      headers: {
        Authorization: 'Bearer ' + token,
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    }
  );
  if (deleteStatus.status !== 204) {
    return false;
  }
  return true;
};

const GetUserData = async (token: string) => {
  const userData = await fetch(`${process.env.BACKEND_URL}user/get-data`, {
    credentials: 'include',
    headers: {
      Authorization: 'Bearer ' + token,
    },
  });
  return await userData.json();
};

const GetLeagueItems = async () => {
  const allItems = await fetch(`${process.env.BACKEND_URL}league/items/last`);
  const allItemsJSON = await allItems.json();
  return allItemsJSON;
};

const GetDotaItems = async () => {
  const allItems = await fetch(`${process.env.BACKEND_URL}dota/items`);
  const allItemsJSON = await allItems.json();
  return allItemsJSON;
};

const GetUserLeagueBuilds = async (token: string) => {
  const userData = await fetch(`${process.env.BACKEND_URL}league/builds/user`, {
    credentials: 'include',
    headers: {
      Authorization: 'Bearer ' + token,
    },
  });
  if (userData.status !== 404) {
    return await userData.json();
  } else {
    return null;
  }
};

const UserProfile: NextPage = props => {
  const token = cookie.get('token');

  const [isQueryLoading, setQueryLoading] = useState(true);
  const [userData, setUserData] = useState();
  const [allChampions, setAllChampions] = useState({
    league: [],
    dota: [],
    overwatch: [],
  });
  const [leagueItems, setLeagueItems] = useState();
  const [userLeagueBuilds, setUserLeagueBuilds] = useState();

  useEffect(() => {
    setQueryLoading(true);
    GetUserData(token).then(data => {
      setUserData(data);
      setQueryLoading(false);
    });
    setQueryLoading(true);
    GetAllChamps().then(champs => {
      setAllChampions(champs);
      setQueryLoading(false);
    });
    setQueryLoading(true);
    GetLeagueItems().then(items => {
      setLeagueItems(items);
      setQueryLoading(false);
    });
    setQueryLoading(true);
    GetUserLeagueBuilds(token).then(builds => {
      if (builds) {
        setUserLeagueBuilds(builds);
      } else {
        setUserLeagueBuilds([]);
      }
      setQueryLoading(false);
    });
  }, []);
  return (
    <React.Fragment>
      <Head>
        <title>Your Profile</title>
      </Head>
      {!isQueryLoading && userData ? (
        <User
          handleRemoveChamp={RemoveFavoriteChamp}
          handleAddChamp={AddFavoriteChamp}
          handlechangePrivacy={SetBuildPrivacy}
          handleCreateLeagueBuild={async (
            items: Array<string>,
            isPrivate: boolean = true,
            championId: string
          ) => {
            const data = await CreateLeagueBuild(items, isPrivate, championId);
            if (data) {
              setUserLeagueBuilds([...userLeagueBuilds, data]);
              return true;
            }
            return false;
          }}
          handleRemoveLeagueBuild={async (buildId: string) => {
            const status = await RemoveLeagueBuild(buildId);
            if (status) {
              const prevLeagueBuilds = [...userLeagueBuilds];
              const index = prevLeagueBuilds.findIndex(
                build => build._id === buildId
              );
              prevLeagueBuilds.splice(index, 1);
              setUserLeagueBuilds(prevLeagueBuilds);
              return true;
            }
            return false;
          }}
          userData={userData}
          champions={{
            league: allChampions.league,
            dota: allChampions.dota,
            overwatch: allChampions.overwatch,
          }}
          leagueItems={leagueItems}
          leagueBuilds={userLeagueBuilds}
        />
      ) : (
        <Typography>Loading...</Typography>
      )}
    </React.Fragment>
  );
};

export default withAuthSync(UserProfile);
