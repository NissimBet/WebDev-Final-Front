import React, { useState } from 'react';
import {
  Box,
  Typography,
  TextField,
  Button,
  makeStyles,
  Link,
} from '@material-ui/core';

import { Formik } from 'formik';
import { string, object, ref } from 'yup';
import { registerUser } from '../../utils/UserActions';
import Router from 'next/router';
import NextLink from 'next/link';

const useStyles = makeStyles(theme => ({
  title: {
    fontSize: theme.typography.h5.fontSize,
    maxWidth: '90%',
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  errorMessage: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3),
  },
}));

const validation = object().shape({
  email: string()
    .email('Please input a valid email address')
    .required('Please input your email address'),
  username: string().required('Please input your username'),
  password: string().required('Please input your password'),
  matchPassword: string()
    .oneOf([ref('password'), null], 'Passwords must match')
    .required('Please confirm your password'),
});

export default () => {
  const classes = useStyles({});
  const [registerError, setRegisterError] = useState(false);
  return (
    <React.Fragment>
      <Typography align="center" className={classes.title}>
        Register <b>now</b> to save your loadouts and favorite champs!
      </Typography>
      <Formik
        initialValues={{
          email: '',
          password: '',
          matchPassword: '',
          username: '',
        }}
        onSubmit={async (values, actions) => {
          actions.setSubmitting(true);

          const success = await registerUser({ ...values });

          if (success) {
            setRegisterError(false);
            Router.push('/login');
          } else {
            setRegisterError(true);
          }

          actions.setSubmitting(false);
        }}
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
                my={2}
                width={[1, 0.75, 0.5]}
                display="flex"
                alignItems="center"
                flexDirection="column"
              >
                <TextField
                  fullWidth
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
                my={2}
                width={[1, 0.75, 0.5]}
                display="flex"
                alignItems="center"
                flexDirection="column"
              >
                <TextField
                  fullWidth
                  margin="dense"
                  id="login-username-input"
                  label="Username"
                  type="text"
                  name="username"
                  error={
                    formikBag.errors.username && formikBag.touched.username
                  }
                  onChange={formikBag.handleChange}
                  onBlur={formikBag.handleBlur}
                />
                {formikBag.errors.username && formikBag.touched.username && (
                  <Typography color="error">
                    {formikBag.errors.username}
                  </Typography>
                )}
              </Box>
              <Box
                my={2}
                width={[1, 0.75, 0.5]}
                display="flex"
                alignItems="center"
                flexDirection="column"
              >
                <TextField
                  fullWidth
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
              <Box
                my={2}
                width={[1, 0.75, 0.5]}
                display="flex"
                alignItems="center"
                flexDirection="column"
              >
                <TextField
                  fullWidth
                  margin="dense"
                  id="login-matchPassword-input"
                  label="Confirm Password"
                  type="password"
                  name="matchPassword"
                  error={
                    formikBag.errors.matchPassword &&
                    formikBag.touched.matchPassword
                  }
                  onChange={formikBag.handleChange}
                  onBlur={formikBag.handleBlur}
                />
                {formikBag.errors.matchPassword &&
                  formikBag.touched.matchPassword && (
                    <Typography color="error">
                      {formikBag.errors.matchPassword}
                    </Typography>
                  )}
              </Box>
              {registerError && (
                <Typography className={classes.errorMessage} color="error">
                  Email already in use,{' '}
                  <NextLink href="/login">
                    <Link href="/login">login</Link>
                  </NextLink>{' '}
                  now
                </Typography>
              )}
              <Button
                type="submit"
                disabled={formikBag.isSubmitting}
                variant="contained"
              >
                Register
              </Button>
            </Box>
          </form>
        )}
      </Formik>
    </React.Fragment>
  );
};
