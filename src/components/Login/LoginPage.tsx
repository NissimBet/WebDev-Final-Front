import React, { useState } from 'react';
import {
  Box,
  Typography,
  TextField,
  Button,
  makeStyles,
  Link,
} from '@material-ui/core';
import NextLink from 'next/link';
import { Formik } from 'formik';
import { string, object } from 'yup';
import { loginUser } from '../../utils/UserActions';
import Router from 'next/router';

const useStyles = makeStyles(theme => ({
  title: {
    fontSize: theme.typography.h5.fontSize,
    maxWidth: '90%',
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  errorMessage: {
    marginTop: theme.spacing(3),
  },
}));

const validation = object().shape({
  email: string()
    .email('Please input a valid email address')
    .required('Please input your email address'),
  password: string().required('Please input your password'),
});

export default () => {
  const [loginError, setLoginError] = useState(false);
  const classes = useStyles({});

  return (
    <React.Fragment>
      <Typography align="center" className={classes.title}>
        Login to see your champions and loadouts!
      </Typography>

      <Formik
        initialValues={{ email: '', password: '' }}
        onSubmit={async (values, actions) => {
          actions.setSubmitting(true);

          const successStatus = await loginUser(values.email, values.password);

          if (successStatus !== 200) {
            setLoginError(true);
          } else {
            setLoginError(false);
            Router.push('/');
          }

          actions.setSubmitting(false);
        }}
        validationSchema={validation}
      >
        {formikBag => (
          <form onSubmit={formikBag.handleSubmit}>
            {loginError && (
              <Typography
                className={classes.errorMessage}
                align="center"
                color="error"
              >
                Email or password combination does not exist consider{' '}
                <NextLink href="/register">
                  <Link href="/register">registering</Link>
                </NextLink>
              </Typography>
            )}
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
              <Button
                disabled={formikBag.isSubmitting}
                type="submit"
                variant="contained"
              >
                Login
              </Button>
              <Box my={3}>
                <Typography>
                  Don't have an account,{' '}
                  <NextLink href="/register">
                    <Link href="/register">Register</Link>
                  </NextLink>
                </Typography>
              </Box>
            </Box>
          </form>
        )}
      </Formik>
    </React.Fragment>
  );
};
