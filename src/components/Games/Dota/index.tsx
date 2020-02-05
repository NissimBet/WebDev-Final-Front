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
  _id: string;
  id: number;
  name: string;
  imageName: string;
}
interface DotaBuildData {
  _id: string;
  creator: {
    username: string;
  };
  items: Array<DotaItemData>;
  private: boolean;
  createdAt: Date;
  champion: ChampionData;
}
interface DotaItemData {
  id: number;
  name: string;
  cost: number;
  secret_shop: number;
  side_shop: number;
  recipe: number;
  localized_name: string;
}

const DotaItem: React.FunctionComponent<DotaItemData> = ({
  name,
  localized_name,
}) => {
  return (
    <Box display="flex" alignItems="center" flexDirection="column" marginY={1}>
      <img
        src={`http://cdn.dota2.com/apps/dota2/images/items/${name.replace(
          'item_',
          ''
        )}_lg.png`}
        alt={name}
      />
      <Typography align="center" variant="subtitle2">
        {localized_name}
      </Typography>
    </Box>
  );
};

const DotaBuild: React.FunctionComponent<{
  buildData: DotaBuildData;
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
            <DotaItem {...item} />
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
          src={`http://cdn.dota2.com/apps/dota2/images/heroes/${champion.imageName}_sb.png`}
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
const GetAllPublicDotaBuilds = async () => {
  const allBuilds = await fetch(`${process.env.BACKEND_URL}dota/builds/all`);
  const allBuildsJSON = await allBuilds.json();
  return allBuildsJSON;
};

export default () => {
  const [allBuilds, setAllBuilds] = useState();
  const [isQueryLoading, setQueryLoading] = useState(true);
  useEffect(() => {
    setQueryLoading(true);
    GetAllPublicDotaBuilds().then(data => {
      setAllBuilds(data);
      setQueryLoading(false);
    });
  }, []);
  return (
    <Box>
      <Typography variant="h5">Dota builds</Typography>
      <Box display="flex" flexWrap="wrap">
        {!isQueryLoading ? (
          allBuilds.length > 0 ? (
            allBuilds.map((build: DotaBuildData) => (
              <Box
                key={build.creator.username + build.createdAt}
                width={[1, 1 / 2, 1 / 3]}
              >
                <DotaBuild buildData={build} key={build._id} />
              </Box>
            ))
          ) : (
            <Typography>
              There are no public builds for Dota at the time
            </Typography>
          )
        ) : (
          <Typography>Loading...</Typography>
        )}
      </Box>
    </Box>
  );
};
