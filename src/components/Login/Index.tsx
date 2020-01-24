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
  makeStyles,
  Typography,
} from '@material-ui/core';
import { object, string } from 'yup';

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
        Login
      </Button>
      <Dialog
        open={isDialogOpen}
        onClose={handleClickClose}
        aria-labelledby="login-dialog-title"
      >
        <DialogTitle id="login-dialog-title">Login to out website</DialogTitle>
        <DialogContent>
          <Formik
            initialValues={{ email: '', password: '' }}
            onSubmit={(values, actions) => {
              console.log(values);
              handleClickClose();
            }}
            validationSchema={validator}
          >
            {formikBag => (
              <form onSubmit={formikBag.handleSubmit}>
                <DialogContentText>
                  Login to our site to use all of its awesome features
                </DialogContentText>

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
                  <Button type="submit" color="primary">
                    Login
                  </Button>
                </DialogActions>
              </form>
            )}
          </Formik>
        </DialogContent>
      </Dialog>
    </div>
  );
};