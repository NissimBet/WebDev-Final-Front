import React from 'react';
import { Box, Typography } from '@material-ui/core';
import { NextPage } from 'next';

import FavoriteChampList from './FavoriteChampions';
import CreateLeagueBuild from '../Games/League/CreateLeagueBuild';

import {
  LeagueBuildData,
  LeagueItemData,
  UserData,
  DotaChampion,
  LeagueChampion,
  OverwatchChampion,
} from '../../utils/DBInterfaces';
import {
  CreateLeagueBuildFunction,
  RemoveFavoriteChampFunction,
  AddFavoriteChampFunction,
  SetLeagueBuildPrivacyFunction,
  RemoveLeagueBuildFunction,
} from '../../utils/Queries';
import LeagueBuild from '../Games/League/LeagueBuild';

interface UserPageProps {
  userData: UserData;
  champions: {
    league: Array<LeagueChampion>;
    dota: Array<DotaChampion>;
    overwatch: Array<OverwatchChampion>;
  };
  leagueItems: Array<LeagueItemData>;
  leagueBuilds: Array<LeagueBuildData>;
  handleRemoveChamp: RemoveFavoriteChampFunction;
  handleAddChamp: AddFavoriteChampFunction;
  handlechangePrivacy: SetLeagueBuildPrivacyFunction;
  handleRemoveLeagueBuild: RemoveLeagueBuildFunction;
  handleCreateLeagueBuild: CreateLeagueBuildFunction;
}

const UserPage: NextPage<UserPageProps> = ({
  userData,
  handleRemoveChamp,
  handleAddChamp,
  handlechangePrivacy,
  handleCreateLeagueBuild,
  handleRemoveLeagueBuild,
  champions,
  leagueItems,
  leagueBuilds,
}) => {
  return (
    <Box>
      <Typography variant="h4" align="center">
        Your builds
      </Typography>
      <Box display="flex" flexDirection="row" flexWrap="wrap">
        {leagueBuilds &&
          leagueBuilds.map(build => (
            <Box
              key={build.creator.username + build.createdAt}
              width={[1, 1 / 2, 1 / 3]}
            >
              <LeagueBuild
                isEditable={true}
                handleRemoveBuild={handleRemoveLeagueBuild}
                handleChangePrivacy={handlechangePrivacy}
                buildData={build}
              />
            </Box>
          ))}
      </Box>
      {leagueItems && (
        <CreateLeagueBuild
          handleCreateBuild={handleCreateLeagueBuild}
          itemSelection={leagueItems}
          championSelection={champions.league}
        />
      )}

      {/* Favorites List */}
      <Typography align="center" variant="h4">
        Your favorite champions
      </Typography>

      <Box
        display="flex"
        alignItems="stretch"
        flexDirection={['column', 'column', 'row']}
        marginY={3}
      >
        <FavoriteChampList
          handleAddChamp={handleAddChamp}
          handleChampRemoval={handleRemoveChamp}
          champions={userData.favoriteChamps.league}
          allChampions={champions.league}
          game="league"
        />
        <FavoriteChampList
          handleAddChamp={handleAddChamp}
          handleChampRemoval={handleRemoveChamp}
          champions={userData.favoriteChamps.dota}
          allChampions={champions.dota}
          game="dota"
        />
        <FavoriteChampList
          handleAddChamp={handleAddChamp}
          handleChampRemoval={handleRemoveChamp}
          champions={userData.favoriteChamps.overwatch}
          allChampions={champions.overwatch}
          game="overwatch"
        />
      </Box>
    </Box>
  );
};

export default UserPage;
