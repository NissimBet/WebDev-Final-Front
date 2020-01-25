import React from 'react';
import {
  Box,
  Typography,
  TextField,
  Button,
  makeStyles,
} from '@material-ui/core';

import { Formik } from 'formik';
import { string, object } from 'yup';

const useStyles = makeStyles(theme => ({
  title: {
    fontSize: theme.typography.h5.fontSize,
    maxWidth: '90%',
    marginLeft: 'auto',
    marginRight: 'auto',
  },
}));

const validation = object().shape({
  email: string()
    .email('Please input a valid email address')
    .required('Please input your email address'),
  password: string().required('Please input your password'),
});

export default () => {
  const classes = useStyles({});
  return (
    <React.Fragment>
      <Typography align="center" className={classes.title}>
        Login to see your champions and loadouts!
      </Typography>
      <Formik
        initialValues={{ email: '', password: '' }}
        onSubmit={values => console.log(values)}
        validationSchema={validation}
      >
        {formikBag => (
          <form onSubmit={formikBag.handleSubmit}>
            <Box
              display="flex"
              flexDirection="column"
              alignItems="center"
              justifyContent="center"
            >
              <Box
                my={3}
                width={[1, 0.75, 0.5]}
                display="flex"
                alignItems="center"
                flexDirection="column"
              >
                <TextField
                  fullWidth
                  autoFocus
                  margin="dense"
                  id="login-email-input"
                  label="Email Address"
                  type="email"
                  name="email"
                  error={formikBag.errors.email && formikBag.touched.email}
                  onChange={formikBag.handleChange}
                  onBlur={formikBag.handleBlur}
                />
                {formikBag.errors.email && formikBag.touched.email && (
                  <Typography color="error">
                    {formikBag.errors.email}
                  </Typography>
                )}
              </Box>
              <Box
                my={3}
                width={[1, 0.75, 0.5]}
                display="flex"
                alignItems="center"
                flexDirection="column"
              >
                <TextField
                  fullWidth
                  autoFocus
                  margin="dense"
                  id="login-password-input"
                  label="Your Password"
                  type="password"
                  name="password"
                  error={
                    formikBag.errors.password && formikBag.touched.password
                  }
                  onChange={formikBag.handleChange}
                  onBlur={formikBag.handleBlur}
                />
                {formikBag.errors.password && formikBag.touched.password && (
                  <Typography color="error">
                    {formikBag.errors.password}
                  </Typography>
                )}
              </Box>
              <Button type="submit" variant="contained">
                Login
              </Button>
            </Box>
          </form>
        )}
      </Formik>
    </React.Fragment>
  );
};
