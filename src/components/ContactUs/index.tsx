import React from 'react';
import {
  Box,
  Typography,
  Card,
  Grid,
  TextField,
  Button,
} from '@material-ui/core';
import { object, string } from 'yup';
import { Formik } from 'formik';

const validation = object().shape({
  firstname: string().required('Please input your first name'),
  lastname: string().required('Please input your last name'),
  email: string()
    .email('Please input a valid email')
    .required('Please input your email'),
});

export default () => {
  return (
    <Box>
      <Box
        width={['100%', '75%']}
        maxWidth={['100%', '250px', '400px']}
        mx="auto"
      >
        <Typography paragraph align="center" variant="h4">
          Contact Us
        </Typography>

        <Typography paragraph variant="caption" align="center">
          Have a question?
        </Typography>
        <Typography paragraph align="center" variant="subtitle2">
          Send us a message or an email! We will do our best to get back to you
        </Typography>
      </Box>

      <Grid container>
        <Grid item xs={false} sm={2}></Grid>
        <Grid item xs={12} sm={8}>
          <Card style={{ width: '100%' }}>
            <Formik
              initialValues={{
                firstname: '',
                lastname: '',
                email: '',
                message: '',
              }}
              validationSchema={validation}
              onSubmit={values => console.log(values)}
            >
              {formikBag => (
                <form onSubmit={formikBag.handleSubmit}>
                  <Box
                    paddingX={4}
                    display="flex"
                    alignItems="center"
                    flexDirection="column"
                  >
                    <Box display="flex" width="100%">
                      <Box width="100%">
                        <TextField
                          fullWidth
                          margin="dense"
                          id="login-firstname-input"
                          label="Your First Name"
                          type="text"
                          name="firstname"
                          error={
                            formikBag.errors.firstname &&
                            formikBag.touched.firstname
                          }
                          onChange={formikBag.handleChange}
                          onBlur={formikBag.handleBlur}
                        />
                        {formikBag.errors.firstname &&
                          formikBag.touched.firstname && (
                            <Typography color="error">
                              {formikBag.errors.firstname}
                            </Typography>
                          )}
                      </Box>
                      <Box width="100%">
                        <TextField
                          fullWidth
                          margin="dense"
                          id="login-lastname-input"
                          label="Your Last Name"
                          type="text"
                          name="lastname"
                          error={
                            formikBag.errors.lastname &&
                            formikBag.touched.lastname
                          }
                          onChange={formikBag.handleChange}
                          onBlur={formikBag.handleBlur}
                        />
                        {formikBag.errors.lastname &&
                          formikBag.touched.lastname && (
                            <Typography color="error">
                              {formikBag.errors.lastname}
                            </Typography>
                          )}
                      </Box>
                    </Box>
                    <TextField
                      fullWidth
                      margin="dense"
                      id="login-email-input"
                      label="Your Email"
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
                    <TextField
                      fullWidth
                      multiline
                      margin="dense"
                      id="login-message -input"
                      label="A message"
                      type="message"
                      name="message"
                      rowsMax={10}
                      error={
                        formikBag.errors.message && formikBag.touched.message
                      }
                      onChange={formikBag.handleChange}
                      onBlur={formikBag.handleBlur}
                    />
                    <Box alignSelf="flex-end" my={2}>
                      <Button variant="contained" type="submit">
                        Send Message
                      </Button>
                    </Box>
                  </Box>
                </form>
              )}
            </Formik>
          </Card>
        </Grid>
        <Grid item xs={false} sm={2}></Grid>
      </Grid>
    </Box>
  );
};
