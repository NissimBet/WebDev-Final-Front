import React, { useState } from 'react';
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

interface ChampionInterface {
  name: string;
  image: string;
  link: string;
  game: String;
}

const champs: Array<ChampionInterface> = [
  { name: 'Aatrox', image: 'noImage', link: '#', game: 'League of Legends' },
  { name: 'Aatrox', image: 'noImage', link: '#', game: 'League of Legends' },
  { name: 'Aatrox', image: 'noImage', link: '#', game: 'League of Legends' },
  { name: 'Aatrox', image: 'noImage', link: '#', game: 'League of Legends' },
  { name: 'Aatrox', image: 'noImage', link: '#', game: 'League of Legends' },
  { name: 'Aatrox', image: 'noImage', link: '#', game: 'League of Legends' },
  { name: 'Aatrox', image: 'noImage', link: '#', game: 'League of Legends' },
  { name: 'Aatrox', image: 'noImage', link: '#', game: 'League of Legends' },
  { name: 'Aatrox', image: 'noImage', link: '#', game: 'League of Legends' },
  { name: 'Aatrox', image: 'noImage', link: '#', game: 'League of Legends' },
  { name: 'Aatrox', image: 'noImage', link: '#', game: 'League of Legends' },
  { name: 'Invoker', image: 'noImage', link: '#', game: 'Dota 2' },
  { name: 'Invoker', image: 'noImage', link: '#', game: 'Dota 2' },
  { name: 'Invoker', image: 'noImage', link: '#', game: 'Dota 2' },
  { name: 'Invoker', image: 'noImage', link: '#', game: 'Dota 2' },
  { name: 'Invoker', image: 'noImage', link: '#', game: 'Dota 2' },
  { name: 'Invoker', image: 'noImage', link: '#', game: 'Dota 2' },
  { name: 'Invoker', image: 'noImage', link: '#', game: 'Dota 2' },
  { name: 'Invoker', image: 'noImage', link: '#', game: 'Dota 2' },
  { name: 'Invoker', image: 'noImage', link: '#', game: 'Dota 2' },
  { name: 'Invoker', image: 'noImage', link: '#', game: 'Dota 2' },
  { name: 'Winston', image: 'noImage', link: '#', game: 'Overwatch' },
  { name: 'Winston', image: 'noImage', link: '#', game: 'Overwatch' },
  { name: 'Winston', image: 'noImage', link: '#', game: 'Overwatch' },
  { name: 'Winston', image: 'noImage', link: '#', game: 'Overwatch' },
  { name: 'Winston', image: 'noImage', link: '#', game: 'Overwatch' },
  { name: 'Winston', image: 'noImage', link: '#', game: 'Overwatch' },
];

const Champion: React.FunctionComponent<{ champion: ChampionInterface }> = ({
  champion: { name, link: imgSrc },
}) => {
  const classes = useStyles({});
  return (
    <Box key={name} my={2} className={classes.champSlot}>
      <Paper className={classes.champCenter}>
        <Avatar className={classes.champImage} src={imgSrc} alt={name} />
        <Typography>{name}</Typography>
      </Paper>
    </Box>
  );
};

export default () => {
  const classes = useStyles({});
  const games = ['League of Legends', 'Dota 2', 'Overwatch'];
  const [currentGame, setCurrentGame] = useState(0);

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
        {champs
          .filter(
            ({ game }) => games.findIndex(val => val === game) === currentGame
          )
          .map(champ => (
            <Champion champion={champ} />
          ))}
      </Box>
    </Box>
  );
};
