import React, { useState } from 'react';
import {
  Box,
  Typography,
  makeStyles,
  Paper,
  Button,
  Collapse,
  IconButton,
} from '@material-ui/core';
import { NextPage } from 'next';
import differenceBy from 'lodash.differenceby';
import clsx from 'clsx';

const useStyles = makeStyles(theme => ({
  champList: {
    flex: 1,
    margin: `0 ${theme.spacing(2)}px`,
    padding: `${theme.spacing(2)}px ${theme.spacing(3)}px`,
    '&:first-child': {
      marginLeft: 0,
    },
    '&:last-child': {
      marginRight: 0,
    },
    [theme.breakpoints.down('md')]: {
      margin: `${theme.spacing(2)}px 0`,
    },
  },
  removeButton: {
    borderRadius: '50%',
    backgroundColor: theme.palette.error.main,
    color: theme.palette.error.contrastText,
    minWidth: 0,
    width: theme.spacing(3),
    height: theme.spacing(3),
    lineHeight: 1,
  },
  championItem: {
    borderBottom: '1px solid #ccc',
    padding: `${theme.spacing(2)}px 0`,
    margin: `${theme.spacing(2)}px 0`,
  },
  expand: {
    transform: 'rotate(0deg)',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
    padding: 0,
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
}));

interface FavoriteChampListProps {
  champions: Array<ChampionData>;
  allChampions: Array<ChampionData>;
  game: string;
  handleChampRemoval: (game: string, champ: string) => Promise<boolean>;
  handleAddChamp: (game: string, champ: string) => Promise<boolean>;
}

const FavoriteChampList: React.FunctionComponent<FavoriteChampListProps> = ({
  champions,
  game,
  handleChampRemoval,
  handleAddChamp,
  allChampions,
}) => {
  const [expanded, setExpanded] = useState(false);
  const classes = useStyles({});
  const [championNames, setChampionNames] = useState(champions);
  const missingChamps = differenceBy(allChampions, championNames, 'name');
  return (
    <Paper className={classes.champList}>
      <Typography gutterBottom variant="h5" paragraph>
        Your {game} champs
      </Typography>
      {championNames.length > 0 ? (
        <Box>
          {championNames.map(champ => (
            <FavoriteChamp
              handleClick={async () => {
                const wasDelete = await handleChampRemoval(game, champ.id);
                if (wasDelete) {
                  const remainingChamps = championNames.filter(
                    name => name !== champ
                  );
                  setChampionNames(remainingChamps);
                }
              }}
              key={champ.id}
              name={champ.name}
            />
          ))}
        </Box>
      ) : (
        <Typography>You haven't added any champs to {game}</Typography>
      )}
      <Box
        marginTop={2}
        marginBottom={1}
        display="flex"
        flexDirection="row"
        justifyContent="space-between"
        alignItems="center"
      >
        <Typography variant="subtitle2">Add your champion</Typography>

        <IconButton
          disableRipple
          className={clsx(classes.expand, {
            [classes.expandOpen]: expanded,
          })}
          onClick={() => setExpanded(!expanded)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="32"
            height="32"
            viewBox="0 0 24 24"
          >
            <path d="M16.59 8.59L12 13.17 7.41 8.59 6 10l6 6 6-6z" />
          </svg>
        </IconButton>
      </Box>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <Box display="flex" flexDirection="row" flexWrap="wrap">
          {missingChamps.map(({ name, id }) => (
            <Box key={name} width={[1 / 2, 1 / 3]}>
              <Typography
                variant="subtitle1"
                onClick={async () => {
                  const success = await handleAddChamp(game, id);
                  console.log(id, 'add');
                  if (success) {
                    const erasedIndex = missingChamps.findIndex(
                      ({ id: champId }) => id === champId
                    );
                    setChampionNames([
                      ...championNames.filter(
                        ({ id: champId }) => champId !== id
                      ),
                      missingChamps[erasedIndex],
                    ]);
                  }
                }}
              >
                {name}
              </Typography>
            </Box>
          ))}
        </Box>
      </Collapse>
    </Paper>
  );
};

interface FavoriteChampProps {
  name: string;
  handleClick: () => Promise<void>;
}

const FavoriteChamp: React.FunctionComponent<FavoriteChampProps> = ({
  name,
  children,
  handleClick,
}) => {
  const classes = useStyles({});
  return (
    <Box
      className={classes.championItem}
      display="flex"
      justifyContent="space-between"
      alignItems="center"
    >
      <Typography variant="body1">{name}</Typography>
      <Button
        className={classes.removeButton}
        type="button"
        onClick={handleClick}
      >
        x
      </Button>
    </Box>
  );
};

interface ChampionData {
  id: string;
  name: string;
}

interface UserData {
  email: string;
  username: string;
  favoriteChamps: {
    league: [ChampionData];
    dota: [ChampionData];
    overwatch: [ChampionData];
  };
}

interface UserPageProps {
  userData: UserData;
  champions: {
    league: Array<ChampionData>;
    dota: Array<ChampionData>;
    overwatch: Array<ChampionData>;
  };
  handleRemoveChamp: (game: string, champ: string) => Promise<boolean>;
  handleAddChamp: (game: string, champ: string) => Promise<boolean>;
}

const UserPage: NextPage<UserPageProps> = ({
  userData,
  handleRemoveChamp,
  handleAddChamp,
  champions: { league, dota, overwatch },
}) => {
  const [favoriteChamps, setFavoriteChampions] = useState(
    userData.favoriteChamps
  );
  console.log(favoriteChamps);

  return (
    <Box>
      <Typography>Welcome</Typography>

      <p>{userData.email}</p>
      <p>{userData.username}</p>

      <Typography>Your builds</Typography>
      <Typography>create build</Typography>

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
          champions={favoriteChamps.league}
          allChampions={league}
          game="league"
        />
        <FavoriteChampList
          handleAddChamp={handleAddChamp}
          handleChampRemoval={handleRemoveChamp}
          champions={favoriteChamps.dota}
          allChampions={dota}
          game="dota"
        />
        <FavoriteChampList
          handleAddChamp={handleAddChamp}
          handleChampRemoval={handleRemoveChamp}
          champions={favoriteChamps.overwatch}
          allChampions={overwatch}
          game="overwatch"
        />
      </Box>

      {/* Favorite a Champ */}
      {/* <ChampionSelection /> */}
    </Box>
  );
};

export default UserPage;
