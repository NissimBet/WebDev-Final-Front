import React from 'react';
import Head from 'next/head';

import {
  makeStyles,
  Box,
  Typography,
  Button,
  Input,
  InputLabel,
  Grid,
  Select,
  MenuItem,
} from '@material-ui/core';
import { Formik } from 'formik';
import { object, string } from 'yup';

const matStyles = makeStyles(theme => ({
  title: {
    textAlign: 'center',
    marginBottom: theme.spacing(3),
  },
  input: {
    fontSize: theme.spacing(3),
  },
  grid: {
    marginBottom: theme.spacing(3),
  },
}));

const validator = object().shape({
  search: string().notRequired(),
});

const Index = () => {
  const styles = matStyles({});

  return (
    <React.Fragment>
      <Head>
        <title>Your Game Monitor</title>
      </Head>

      <Box>
        <Typography className={styles.title} variant="h3">
          Hello
        </Typography>

        <Formik
          validationSchema={validator}
          initialValues={{ search: '', game: 'League of Legends' }}
          onSubmit={(values, actions) => console.log(values)}
        >
          {formikBag => (
            <form onSubmit={formikBag.handleSubmit}>
              <Box display="flex" flexDirection="column">
                <Grid className={styles.grid} container>
                  <Grid item xs={12} md={4}>
                    <InputLabel id="GameSelection">
                      Select Your Game!
                    </InputLabel>
                    <Select
                      margin="dense"
                      className={styles.input}
                      fullWidth={true}
                      labelId="GameSelection"
                      name="game"
                      onChange={formikBag.handleChange}
                      defaultValue={formikBag.initialValues.game}
                    >
                      <MenuItem
                        className={styles.input}
                        value="League of Legends"
                      >
                        League of Legends
                      </MenuItem>
                      <MenuItem className={styles.input} value="Overwatch">
                        Overwatch
                      </MenuItem>
                      <MenuItem className={styles.input} value="Dota 2">
                        Dota 2
                      </MenuItem>
                    </Select>
                  </Grid>
                  <Grid item xs={false} md={1} />
                  <Grid item xs={12} md={7}>
                    <InputLabel>
                      What champion you want to search for?
                      <Input
                        fullWidth={true}
                        autoFocus={true}
                        className={styles.input}
                        value={formikBag.values.search}
                        type="text"
                        name="search"
                        onChange={formikBag.handleChange}
                        placeholder="Search for your champion"
                      />
                    </InputLabel>
                  </Grid>
                </Grid>
                <Button type="submit" variant="contained">
                  Submit
                </Button>
              </Box>
            </form>
          )}
        </Formik>
      </Box>
    </React.Fragment>
  );
};

export default Index;
