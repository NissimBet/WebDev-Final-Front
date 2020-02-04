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
    textAlign: 'center',
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
  logoSize: {
    objectFit: 'contain',
    maxHeight: '50px',
    marginTop: '15px',
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
interface GamesIcons {
  name: string;
  link: string;
  gameIcon: string;
}
[];
const Logos: GamesIcons[] = [
  {
    name: 'League Of Legends',
    link: 'https://play.lan.leagueoflegends.com/es_MX',
    gameIcon: './league.png',
  },
  {
    name: 'Dota 2',
    link: 'http://es.dota2.com/',
    gameIcon: './dota-2.png',
  },
  {
    name: 'Overwatch',
    link: 'https://playoverwatch.com/es-es/',
    gameIcon: './over.png',
  },
];

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
            <FooterLink className={classes.linkText} link="/">
              Home
            </FooterLink>

            <FooterLink className={classes.linkText} link="/contact-us">
              Contact Us
            </FooterLink>

            <FooterLink className={classes.linkText} link="/about-us">
              About Us
            </FooterLink>

            <FooterLink className={classes.linkText} link="/login">
              Login
            </FooterLink>

            <FooterLink className={classes.linkText} link="/register">
              Register
            </FooterLink>
          </Box>
        </Grid>
        <Grid item xs={false} md={1} />
        <Grid item xs={12} md={6}>
          <Subtitle className={classes.SubtitleText}>Featured Games</Subtitle>
          <Box display="flex" flexDirection="row" justifyContent="space-evenly">
            {Logos.map(icon => (
              <Box marginRight="15px">
                <Link key={icon.name} target="_blank" href={icon.link}>
                  <img
                    className={classes.logoSize}
                    src={icon.gameIcon}
                    alt="icon"
                  />
                </Link>
              </Box>
            ))}
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};
