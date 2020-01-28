import React, { useState, useEffect } from 'react';
import {
  Box,
  Paper,
  makeStyles,
  Typography,
  Select,
  MenuItem,
  InputLabel,
  Avatar,
} from '@material-ui/core';
import { Formik } from 'formik';

const useStyles = makeStyles(theme => ({
  rootGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(8, 1fr)',
    gap: '25px',
    [theme.breakpoints.down('xl')]: {
      gridTemplateColumns: 'repeat(6, 1fr)',
    },
    [theme.breakpoints.down('md')]: {
      gridTemplateColumns: 'repeat(4, 1fr)',
    },
    [theme.breakpoints.down('sm')]: {
      gridTemplateColumns: 'repeat(2, 1fr)',
    },
  },
  champSlot: {
    cursor: 'pointer',
  },
  champCenter: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  champImage: {
    width: theme.spacing(8),
    height: theme.spacing(8),
    margin: theme.spacing(2),
  },
}));

interface LolChampion {
  id: string;
  key: string;
  name: string;
}

interface DotaChampion {
  id: number;
  name: string;
}

interface OWChampion {
  id: number;
  name: string;
}

const Champion: React.FunctionComponent<{
  championData: LolChampion | DotaChampion | OWChampion;
  game: number;
}> = ({ championData, game }) => {
  const classes = useStyles({});
  return (
    <Box my={2} className={classes.champSlot}>
      <Paper className={classes.champCenter}>
        <Avatar
          className={classes.champImage}
          src={championData.name}
          alt={name}
        />
        <Typography>{championData.name}</Typography>
      </Paper>
    </Box>
  );
};

export default () => {
  const classes = useStyles({});
  const games = ['League of Legends', 'Dota 2', 'Overwatch'];
  const [currentGame, setCurrentGame] = useState(0);

  const [champs, setChamps] = useState([]);
  useEffect(() => {
    let url = '';
    switch (currentGame) {
      case 0:
        url = `${process.env.BACKEND_URL}champs/lol/all`;
        break;
      case 1:
        url = `${process.env.BACKEND_URL}champs/dota/all`;
        break;
      case 2:
        url = `${process.env.BACKEND_URL}champs/ow/all`;
        break;
      default:
        url = `${process.env.BACKEND_URL}champs/lol/all`;
        break;
    }
    fetch(url)
      .then(d => d.json())
      .then(champs => {
        setChamps(champs);
      });
  }, [currentGame]);

  return (
    <Box>
      <Formik
        initialValues={{ game: 0 }}
        onSubmit={(values, actions) => console.log(values)}
      >
        {formikBag => (
          <form onSubmit={formikBag.handleSubmit}>
            <InputLabel id="ChampionPoolLabel">Which game</InputLabel>
            <Select
              name="game"
              margin="dense"
              labelId="ChampionPoolLabel"
              onChange={event => {
                formikBag.handleChange(event);
                setCurrentGame(Number(event.target.value));
              }}
              defaultValue={formikBag.initialValues.game}
            >
              {games.map((val, index) => (
                <MenuItem value={index} key={val}>
                  {val}
                </MenuItem>
              ))}
            </Select>
          </form>
        )}
      </Formik>
      <Box className={classes.rootGrid}>
        {champs.map(champ => (
          <Champion key={champ.name} championData={champ} game={currentGame} />
        ))}
      </Box>
    </Box>
  );
};
