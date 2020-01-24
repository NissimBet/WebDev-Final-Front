import React, { ReactNode } from 'react';
import NextLink from 'next/link';
import { Grid, Box, Link, makeStyles, Typography } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    maxWidth: '1200px',
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.getContrastText(theme.palette.primary.main),
    margin: '0 auto',
  },
  SubtitleText: {
    fontSize: theme.spacing(3),
    [theme.breakpoints.down('md')]: {
      textAlign: 'center',
    },
    fontWeight: theme.typography.fontWeightBold,
  },
  flexDoubleCol: {
    display: 'flex',
    justifyContent: 'flex-start',
    flexWrap: 'wrap',

    '&>*': {
      width: '50%',
    },
  },
  linkText: {
    color: theme.palette.getContrastText(theme.palette.primary.main),
    padding: '10px 20px',
    [theme.breakpoints.down('md')]: {
      textAlign: 'center',
    },
  },
}));

interface LinkProps {
  children: ReactNode;
  className: string;
  link: string;
}

interface SubtitleProps {
  children: ReactNode;
  className: string;
}

const Subtitle: React.FunctionComponent<SubtitleProps> = ({
  className,
  children,
}) => <Typography className={className}>{children}</Typography>;

const FooterLink: React.FunctionComponent<LinkProps> = ({
  children,
  className,
  link,
}) => (
  <NextLink href={link}>
    <Link href={link} className={className}>
      {children}
    </Link>
  </NextLink>
);

export default () => {
  const classes = useStyles({});
  return (
    <Box bgcolor="primary.main">
      <Grid className={classes.root} container spacing={3}>
        <Grid item xs={12} md={5}>
          <Subtitle className={classes.SubtitleText}>Links</Subtitle>
          <Box className={classes.flexDoubleCol}>
            <FooterLink className={classes.linkText} link="#">
              Home
            </FooterLink>

            <FooterLink className={classes.linkText} link="#">
              Contact Us
            </FooterLink>

            <FooterLink className={classes.linkText} link="#">
              About Us
            </FooterLink>

            <FooterLink className={classes.linkText} link="#">
              League Of Legends
            </FooterLink>

            <FooterLink className={classes.linkText} link="#">
              Dota 2
            </FooterLink>

            <FooterLink className={classes.linkText} link="#">
              Overwatch
            </FooterLink>
          </Box>
        </Grid>
        <Grid item xs={false} md={1} />
        <Grid item xs={12} md={6}>
          <Subtitle className={classes.SubtitleText}>Logos</Subtitle>
          <Box display="flex" flexDirection="row" justifyContent="space-evenly">
            <FooterLink className={classes.linkText} link="#">
              League Logo
            </FooterLink>
            <FooterLink className={classes.linkText} link="#">
              Dota Logo
            </FooterLink>
            <FooterLink className={classes.linkText} link="#">
              Overwatch Logo
            </FooterLink>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};
