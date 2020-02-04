import React, { useEffect, useState } from 'react';
import {
  Box,
  Typography,
  makeStyles,
  Divider,
  Button,
} from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  buildContainer: {
    border: `1px solid ${theme.palette.primary.light}`,
    boxShadow: theme.shadows[1],
    margin: theme.spacing(2),
    padding: theme.spacing(2),
    display: 'flex',
    flexDirection: 'column',
    '& img': {
      maxWidth: '50px',
      maxHeight: '50px',
      objectFit: 'contain',
    },
  },
}));

interface ChampionData {
  id: string;
  _id: string;
  name: string;
}
interface LeagueBuildData {
  _id: string;
  creator: {
    username: string;
  };
  items: Array<LeagueItemData>;
  private: boolean;
  createdAt: Date;
  champion: ChampionData;
}
interface LeagueItemData {
  id: string;
  name: string;
  description: string;
  plaintext: string;
  gold: number;
  image: string;
  into: [string];
  from: [string];
}

const LeagueItem: React.FunctionComponent<LeagueItemData> = ({
  image,
  name,
}) => {
  return (
    <Box display="flex" alignItems="center" flexDirection="column" marginY={1}>
      <img
        src={`http://ddragon.leagueoflegends.com/cdn/10.2.1/img/item/${image}`}
        alt={name}
      />
      <Typography align="center" variant="subtitle2">
        {name}
      </Typography>
    </Box>
  );
};

const LeagueBuild: React.FunctionComponent<{
  buildData: LeagueBuildData;
}> = ({ buildData: { items, champion, creator } }) => {
  const classes = useStyles({});

  return (
    <Box className={classes.buildContainer}>
      <Box
        display="flex"
        flexDirection="row"
        flexWrap="wrap"
        justifyContent="center"
        marginTop={2}
      >
        {items.map(item => (
          <Box key={item.id} width={[1, 1 / 3, 1 / 3]}>
            <LeagueItem {...item} />
          </Box>
        ))}
      </Box>
      <Divider light />

      <Box
        display="flex"
        marginY={3}
        alignItems="center"
        flexDirection="column"
      >
        <img
          src={`https://ddragon.leagueoflegends.com/cdn/10.2.1/img/champion/${champion.id}.png`}
          width="65px"
          height="65px"
          alt={champion.name}
        />
        <Typography variant="h6">{champion.name}</Typography>
      </Box>

      <Divider light />
      <Typography align="center" variant="caption">
        Created by user {creator.username}
      </Typography>
    </Box>
  );
};
const GetAllPublicLeagueBuilds = async () => {
  const allBuilds = await fetch(`${process.env.BACKEND_URL}league/builds/all`);
  const allBuildsJSON = await allBuilds.json();
  return allBuildsJSON;
};

export default () => {
  const [allBuilds, setAllBuilds] = useState();
  const [isQueryLoading, setQueryLoading] = useState(true);
  useEffect(() => {
    setQueryLoading(true);
    GetAllPublicLeagueBuilds().then(data => {
      setAllBuilds(data);
      setQueryLoading(false);
    });
  }, []);
  return (
    <Box>
      <Typography variant="h5">League of Legends builds</Typography>
      <Box display="flex" flexWrap="wrap">
        {!isQueryLoading ? (
          allBuilds.length > 0 ? (
            allBuilds.map((build: LeagueBuildData) => (
              <Box
                key={build.creator.username + build.createdAt}
                width={[1, 1 / 2, 1 / 3]}
              >
                <LeagueBuild buildData={build} key={build._id} />
              </Box>
            ))
          ) : (
            <Typography>
              There are no public builds for League of Legends at the time
            </Typography>
          )
        ) : (
          <Typography>Loading...</Typography>
        )}
      </Box>
    </Box>
  );
};
