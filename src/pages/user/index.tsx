import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import User from '../../components/User';
import { withAuthSync } from '../../utils/Authentication';
import { NextPage } from 'next';
import { Typography } from '@material-ui/core';

import {
  AddFavoriteChamp,
  RemoveFavoriteChamp,
  GetAllChamps,
  CreateLeagueBuild,
  RemoveLeagueBuild,
  GetLeagueItems,
  GetUserData,
  GetUserLeagueBuilds,
  SetLeagueBuildPrivacy,
} from '../../utils/Queries';
import {
  UserData,
  AllChampions,
  LeagueItemData,
  LeagueBuildData,
} from '../../utils/DBInterfaces';

const UserProfile: NextPage = () => {
  const [isQueryLoading, setQueryLoading] = useState(true);
  const [userData, setUserData] = useState<UserData>();
  const [allChampions, setAllChampions] = useState<AllChampions>();
  const [leagueItems, setLeagueItems] = useState<Array<LeagueItemData>>();
  const [userLeagueBuilds, setUserLeagueBuilds] = useState<
    Array<LeagueBuildData>
  >();

  useEffect(() => {
    setQueryLoading(true);
    Promise.all([
      GetUserData().then(data => setUserData(data)),
      GetAllChamps().then(champs => setAllChampions(champs)),
      GetLeagueItems().then(items => setLeagueItems(items)),
      GetUserLeagueBuilds().then(builds => {
        if (builds) {
          setUserLeagueBuilds(builds);
        } else {
          setUserLeagueBuilds([]);
        }
      }),
    ]).then(() => setQueryLoading(false));
  }, []);

  const handleCreateLeagueBuild = async (
    items: Array<string>,
    isPrivate: boolean = true,
    championId: string
  ) => {
    const data = await CreateLeagueBuild(items, isPrivate, championId);
    if (data) {
      setUserLeagueBuilds([...userLeagueBuilds, data]);
      return data;
    }
    return null;
  };

  const handleRemoveLeagueBuild = async (buildId: string) => {
    const status = await RemoveLeagueBuild(buildId);
    if (status) {
      const prevLeagueBuilds = [...userLeagueBuilds];
      const index = prevLeagueBuilds.findIndex(build => build._id === buildId);
      prevLeagueBuilds.splice(index, 1);
      setUserLeagueBuilds(prevLeagueBuilds);
      return true;
    }
    return false;
  };

  return (
    <React.Fragment>
      <Head>
        <title>Your Profile</title>
      </Head>
      {!isQueryLoading && userData ? (
        <User
          handleRemoveChamp={RemoveFavoriteChamp}
          handleAddChamp={AddFavoriteChamp}
          handlechangePrivacy={SetLeagueBuildPrivacy}
          handleCreateLeagueBuild={handleCreateLeagueBuild}
          handleRemoveLeagueBuild={handleRemoveLeagueBuild}
          userData={userData}
          champions={allChampions}
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
