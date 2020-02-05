import React, { useState } from 'react';
import { CreateLeagueBuildFunction } from '../../../utils/Queries';
import { LeagueItemData, LeagueChampion } from '../../../utils/DBInterfaces';
import {
  Box,
  Typography,
  Grid,
  Switch,
  Select,
  MenuItem,
  Button,
  Collapse,
  makeStyles,
} from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  champSelect: {
    display: 'flex',
    justifyContent: 'space-between',
  },
}));
interface CreateLeagueInterface {
  handleCreateBuild: CreateLeagueBuildFunction;
  itemSelection: Array<LeagueItemData>;
  championSelection: Array<LeagueChampion>;
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

export default CreateLeagueBuild;
