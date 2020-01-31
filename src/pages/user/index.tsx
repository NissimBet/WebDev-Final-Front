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

const GetUserData = async (token: string) => {
  const userData = await fetch(`${process.env.BACKEND_URL}user/get-data`, {
    credentials: 'include',
    headers: {
      Authorization: 'Bearer ' + token,
    },
  });
  return await userData.json();
};

const UserProfile: NextPage = props => {
  const token = cookie.get('token');

  const [isUserDataLoading, setUserLoadingQuery] = useState(true);
  const [userData, setUserData] = useState();
  const [allChampions, setAllChampions] = useState({
    league: [],
    dota: [],
    overwatch: [],
  });
  const [isChampionsDataLoading, setChampionDataLoading] = useState(true);
  useEffect(() => {
    setUserLoadingQuery(true);
    GetUserData(token).then(data => {
      setUserData(data);
      setUserLoadingQuery(false);
    });
    setChampionDataLoading(true);
    GetAllChamps().then(champs => {
      setAllChampions(champs);
      setChampionDataLoading(false);
    });
  }, []);
  console.log(userData);
  return (
    <React.Fragment>
      <Head>
        <title>{isUserDataLoading ? 'Your Profile' : userData.username}</title>
      </Head>
      {!isUserDataLoading && !isChampionsDataLoading ? (
        <User
          handleRemoveChamp={RemoveFavoriteChamp}
          handleAddChamp={AddFavoriteChamp}
          userData={userData}
          champions={{
            league: allChampions.league,
            dota: allChampions.dota,
            overwatch: allChampions.overwatch,
          }}
        />
      ) : (
        <Typography>Loading...</Typography>
      )}
    </React.Fragment>
  );
};

export default withAuthSync(UserProfile);
