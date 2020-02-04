import React, { useState } from 'react';
import {
  Box,
  Typography,
  makeStyles,
  Paper,
  Button,
  Collapse,
  IconButton,
  Select,
  MenuItem,
  Switch,
  Grid,
  Divider,
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
      margin: `${theme.spacing(1)}px ${theme.spacing(2)}px`,
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
  champSelect: {
    display: 'flex',
    justifyContent: 'space-between',
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
  const [championNames, setChampionNames] = useState(
    champions.sort((a, b) => (a.name < b.name ? -1 : 1))
  );
  const missingChamps = differenceBy(
    allChampions,
    championNames,
    'name'
  ).sort((a, b) => (a.name < b.name ? -1 : 1));
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
                  setChampionNames(
                    remainingChamps.sort((a, b) => (a.name < b.name ? -1 : 1))
                  );
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
            <Box key={name} width={[1 / 2, 1 / 3]} marginY="4px" paddingX={1}>
              <Typography
                variant="subtitle1"
                onClick={async () => {
                  const success = await handleAddChamp(game, id);
                  if (success) {
                    const erasedIndex = missingChamps.findIndex(
                      ({ id: champId }) => id === champId
                    );
                    setChampionNames(
                      [
                        ...championNames.filter(
                          ({ id: champId }) => champId !== id
                        ),
                        missingChamps[erasedIndex],
                      ].sort((a, b) => (a.name < b.name ? -1 : 1))
                    );
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

const LeagueBuild: React.FunctionComponent<{
  buildData: LeagueBuildData;
  handleChangePrivacy: (buildId: string, privacy: boolean) => Promise<boolean>;
  handleRemoveBuild: (buildId: string) => Promise<boolean>;
}> = ({
  buildData: { _id, items, private: isPrivate, champion },
  handleChangePrivacy,
  handleRemoveBuild,
}) => {
  const classes = useStyles({});
  const [status, setStatus] = useState(isPrivate);
  const [queryLoading, setQueryLoading] = useState(false);
  return (
    <Box className={classes.buildContainer}>
      <Box marginLeft="auto">
        <Button
          className={classes.removeButton}
          type="button"
          onClick={() => handleRemoveBuild(_id)}
        >
          x
        </Button>
      </Box>
      <Box
        display="flex"
        flexDirection="row"
        flexWrap="wrap"
        justifyContent="center"
      >
        {items.map((item, index) => (
          <Box
            key={`${item._id} - ${index}`}
            width={[1 / 2, 1 / 2, 1 / 3]}
            padding={2}
          >
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
      <Box marginY={1}>
        <Typography variant="caption">
          {status
            ? 'This build is currently private and is not currently shared with other people'
            : 'This build is currently public and anyone can see it'}
        </Typography>
      </Box>
      <Button
        disabled={queryLoading}
        onClick={async () => {
          setQueryLoading(true);
          await handleChangePrivacy(_id, !status);
          setQueryLoading(false);
          setStatus(!status);
        }}
        variant="outlined"
        fullWidth
      >
        Click here to make it {status ? 'public' : 'private'}
      </Button>
    </Box>
  );
};

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

interface CreateLeagueInterface {
  handleCreateBuild: (
    items: Array<string>,
    isPrivate: boolean,
    championId: string
  ) => Promise<boolean>;
  itemSelection: Array<LeagueItemData>;
  championSelection: Array<ChampionData>;
}

const CreateLeagueBuild: React.FunctionComponent<CreateLeagueInterface> = ({
  handleCreateBuild,
  itemSelection,
  championSelection,
}) => {
  const classes = useStyles({});
  const [isPrivate, setPrivacy] = useState(false);
  const [currentChamp, setCurrentChamp] = useState('Select');
  const [selectedItems, setSelectedItems] = useState([
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
  ]);
  const [isCreateLeagueOpen, setCreateLeagueOpen] = useState(false);
  const [isSubmitError, setSubmitError] = useState(false);

  const selectNewItem = (index: number) => {
    const undefinedIndex = selectedItems.findIndex(
      val => typeof val === 'undefined'
    );
    if (undefinedIndex >= 0) {
      const newItems = [...selectedItems];
      newItems[undefinedIndex] = itemSelection[index];
      setSelectedItems(newItems);
    }
  };

  const removeItemAtIndex = (id: string) => {
    const itemIndex = selectedItems.findIndex(val => val && val.id === id);
    if (itemIndex >= 0) {
      const newItems = [...selectedItems];
      newItems[itemIndex] = undefined;
      setSelectedItems(newItems);
    }
  };

  return (
    <Box marginY={3}>
      <Collapse in={isCreateLeagueOpen} unmountOnExit timeout="auto">
        <Typography variant="h5">New Build</Typography>
        <Grid component="label" container alignItems="center" spacing={1}>
          <Grid item>Public</Grid>
          <Grid item>
            <Switch
              checked={isPrivate}
              onChange={() => setPrivacy(!isPrivate)}
              value="isPrivate"
            />
          </Grid>
          <Grid item>Private</Grid>
        </Grid>
        <Box display="flex" flexDirection="column">
          <Box marginY={3} display="flex">
            <Box display="flex" flex={1} flexWrap="wrap">
              {selectedItems.map(
                (item, index) =>
                  item && (
                    <Box
                      key={`${item.id} - ${index}`}
                      marginX={1}
                      onClick={() => removeItemAtIndex(item.id)}
                    >
                      <img
                        width={50}
                        height={50}
                        src={`http://ddragon.leagueoflegends.com/cdn/10.2.1/img/item/${item.image}`}
                        alt={item.name}
                      />
                    </Box>
                  )
              )}
            </Box>
            {championSelection && (
              <Box>
                <Typography variant="subtitle2">
                  Select your champion
                </Typography>
                <Select
                  labelId="ChampionSelection"
                  onChange={event => {
                    setCurrentChamp(event.target.value as string);
                  }}
                  value={currentChamp}
                >
                  <MenuItem value="Select">
                    Select your champion for the build
                  </MenuItem>
                  {championSelection
                    .sort((a, b) => (a.name < b.name ? -1 : 1))
                    .map(champion => (
                      <MenuItem
                        key={champion.id}
                        value={champion.id}
                        className={classes.champSelect}
                      >
                        {champion.name}
                        <img
                          src={`https://ddragon.leagueoflegends.com/cdn/10.2.1/img/champion/${champion.id}.png`}
                          width={40}
                          height={40}
                        />
                      </MenuItem>
                    ))}
                </Select>
              </Box>
            )}
          </Box>
          <Box marginLeft={3} display="flex" flexWrap="wrap" flex={2}>
            {itemSelection.map((item, index) => (
              <Box
                key={item.id}
                marginX={1}
                onClick={() => selectNewItem(index)}
              >
                <img
                  width={50}
                  height={50}
                  src={`http://ddragon.leagueoflegends.com/cdn/10.2.1/img/item/${item.image}`}
                  alt={item.name}
                />
              </Box>
            ))}{' '}
          </Box>
        </Box>
        <Box
          display="flex"
          alignItems="flex-end"
          flexDirection="column"
          marginY={2}
        >
          {isSubmitError && (
            <Typography variant="caption" color="error">
              Please select at least 1 item and a champion for the build
            </Typography>
          )}
          <Button
            variant="outlined"
            onClick={() => {
              if (
                selectedItems.filter(data => typeof data !== 'undefined')
                  .length > 0 &&
                currentChamp !== 'Select'
              ) {
                setSubmitError(false);

                handleCreateBuild(
                  selectedItems.filter(val => typeof val !== 'undefined'),
                  isPrivate,
                  currentChamp
                );
              } else {
                setSubmitError(true);
              }
            }}
          >
            Create Build
          </Button>
        </Box>
      </Collapse>
      <Button
        variant="contained"
        onClick={() => setCreateLeagueOpen(!isCreateLeagueOpen)}
      >
        {isCreateLeagueOpen ? 'Close' : 'Open'} Build creation menu
      </Button>
    </Box>
  );
};

interface ChampionData {
  id: string;
  _id: string;
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

interface LeagueItemData {
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

interface LeagueBuildData {
  _id: string;
  creator: string;
  items: Array<LeagueItemData>;
  private: boolean;
  createdAt: Date;
  champion: ChampionData;
}

interface UserPageProps {
  userData: UserData;
  champions: {
    league: Array<ChampionData>;
    dota: Array<ChampionData>;
    overwatch: Array<ChampionData>;
  };
  leagueItems: Array<LeagueItemData>;
  leagueBuilds: Array<LeagueBuildData>;
  handleRemoveChamp: (game: string, champ: string) => Promise<boolean>;
  handleAddChamp: (game: string, champ: string) => Promise<boolean>;
  handlechangePrivacy: (buildId: string, privacy: boolean) => Promise<boolean>;
  handleRemoveLeagueBuild: (buildId: string) => Promise<boolean>;
  handleCreateLeagueBuild: (
    items: Array<string>,
    isPrivate: boolean,
    championId: string
  ) => Promise<boolean>;
}

const UserPage: NextPage<UserPageProps> = ({
  userData,
  handleRemoveChamp,
  handleAddChamp,
  handlechangePrivacy,
  handleCreateLeagueBuild,
  handleRemoveLeagueBuild,
  champions: { league, dota, overwatch },
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
              key={build.creator + build.createdAt}
              width={[1, 1 / 2, 1 / 3]}
            >
              <LeagueBuild
                handleRemoveBuild={handleRemoveLeagueBuild}
                handleChangePrivacy={handlechangePrivacy}
                buildData={build}
              />
            </Box>
          ))}
      </Box>
      {/* <Typography>create build</Typography> */}
      {leagueItems && (
        <CreateLeagueBuild
          handleCreateBuild={handleCreateLeagueBuild}
          itemSelection={leagueItems}
          championSelection={league}
        />
      )}
      {/* const { items, private: isPrivate } = req.body; */}

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
          allChampions={league}
          game="league"
        />
        <FavoriteChampList
          handleAddChamp={handleAddChamp}
          handleChampRemoval={handleRemoveChamp}
          champions={userData.favoriteChamps.dota}
          allChampions={dota}
          game="dota"
        />
        <FavoriteChampList
          handleAddChamp={handleAddChamp}
          handleChampRemoval={handleRemoveChamp}
          champions={userData.favoriteChamps.overwatch}
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
