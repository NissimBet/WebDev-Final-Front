import React, { useState } from 'react';
import { Formik } from 'formik';
import {
  Dialog,
  DialogTitle,
  Button,
  DialogContent,
  DialogContentText,
  DialogActions,
  TextField,
  Box,
  makeStyles,
  Typography,
  Link,
} from '@material-ui/core';
import { object, string } from 'yup';
import NextLink from 'next/link';
import Router from 'next/router';
import { loginUser } from '../../utils/UserActions';

const useStyle = makeStyles({
  errorMessage: {
    fontSize: '15px',
  },
});

const validator = object().shape({
  email: string()
    .required('Please input your email address')
    .email('Plase input a valid email address'),
  password: string().required('Please input yout password'),
});

export default () => {
  const [isDialogOpen, setOpenDialog] = useState(false);
  const [loginError, setLoginError] = useState(false);
  const classes = useStyle({});
  const handleClickOpen = () => {
    setOpenDialog(true);
  };
  const handleClickClose = () => {
    setOpenDialog(false);
  };

  return (
    <div>
      <Button variant="text" color="inherit" onClick={handleClickOpen}>
        <Box marginRight={2} display="flex" alignItems="center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
          >
            <path d="M21 3.01H3c-1.1 0-2 .9-2 2V9h2V4.99h18v14.03H3V15H1v4.01c0 1.1.9 1.98 2 1.98h18c1.1 0 2-.88 2-1.98v-14c0-1.11-.9-2-2-2zM11 16l4-4-4-4v3H1v2h10v3z" />
          </svg>
        </Box>
        Login
      </Button>
      <Dialog
        fullWidth
        maxWidth="sm"
        open={isDialogOpen}
        onClose={handleClickClose}
        aria-labelledby="login-dialog-title"
      >
        <DialogTitle id="login-dialog-title">Login to out website</DialogTitle>
        <DialogContent>
          <Formik
            initialValues={{ email: '', password: '' }}
            onSubmit={async (values, actions) => {
              actions.setSubmitting(true);

              const successStatus = await loginUser(
                values.email,
                values.password
              );

              if (successStatus !== 200) {
                setLoginError(true);
              } else {
                setLoginError(false);
                handleClickClose();
                Router.push('/');
              }

              actions.setSubmitting(false);
            }}
            validationSchema={validator}
          >
            {formikBag => (
              <form onSubmit={formikBag.handleSubmit}>
                <DialogContentText>
                  Login to our site to use all of its awesome features
                </DialogContentText>

                {loginError && (
                  <DialogContentText
                    className={classes.errorMessage}
                    color="error"
                  >
                    Email or password combination does not exist consider{' '}
                    <NextLink href="/register">
                      <Link href="/register">registering</Link>
                    </NextLink>
                  </DialogContentText>
                )}

                <TextField
                  autoFocus
                  margin="dense"
                  id="dialog-login-email"
                  label="Email Address"
                  type="email"
                  name="email"
                  error={
                    formikBag.errors.email && formikBag.touched.email
                      ? true
                      : false
                  }
                  onChange={formikBag.handleChange}
                  onBlur={formikBag.handleBlur}
                  fullWidth
                />
                {formikBag.errors.email && formikBag.touched.email && (
                  <Typography className={classes.errorMessage} color="error">
                    {formikBag.errors.email}
                  </Typography>
                )}

                <TextField
                  margin="dense"
                  id="dialog-login-password"
                  label="Password"
                  type="password"
                  name="password"
                  error={
                    formikBag.errors.password && formikBag.touched.password
                      ? true
                      : false
                  }
                  onChange={formikBag.handleChange}
                  onBlur={formikBag.handleBlur}
                  fullWidth
                />
                {formikBag.errors.password && formikBag.touched.password && (
                  <Typography className={classes.errorMessage} color="error">
                    {formikBag.errors.password}
                  </Typography>
                )}

                <DialogActions>
                  <Button onClick={handleClickClose} color="primary">
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    disabled={formikBag.isSubmitting}
                    color="primary"
                  >
                    Login
                  </Button>
                </DialogActions>
              </form>
            )}
          </Formik>
          <Box>
            <Typography>
              If you don't have an account,{' '}
              <NextLink href="/register">
                <Link href="/register" onClick={handleClickClose}>
                  register here
                </Link>
              </NextLink>
            </Typography>
          </Box>
        </DialogContent>
      </Dialog>
    </div>
  );
};
