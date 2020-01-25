import React, { useState } from 'react';
import NextLink from 'next/link';

import {
  AppBar,
  Link,
  Typography,
  Toolbar,
  Box,
  makeStyles,
  Button,
  Menu,
  MenuItem,
} from '@material-ui/core';

import { LoginDialog } from './Login';
interface SiteLink {
  name: string;
  link: string;
}

interface ComposedSiteLink {
  name: string;
  site: SiteLink[];
}

const siteLinks: Array<SiteLink | ComposedSiteLink> = [
  {
    name: 'Home',
    link: '/',
  },
  {
    name: 'About Us',
    link: '/AboutUs',
  },
  {
    name: 'Contact Us',
    link: '/ContactUs',
  },
  {
    name: 'games',
    site: [
      {
        name: 'Dota 2',
        link: '/',
      },
      {
        name: 'League of Legends',
        link: '/',
      },
      {
        name: 'Overwatch',
        link: '/',
      },
    ],
  },
];

const useStyle = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexDirection: 'row',
    maxWidth: '1200px',
    width: '100%',
    margin: '0 auto',
  },
  separator: {
    '& > *': {
      marginRight: theme.spacing(2),
    },
  },
  svg: {
    fill: theme.palette.background.default,
    width: theme.spacing(3),
    height: theme.spacing(3),
  },
}));

const NavLink: React.FunctionComponent<SiteLink> = ({ link, name }) => (
  <Button color="inherit">
    <NextLink href={link}>
      <Link color="inherit" href={link}>
        {name}
      </Link>
    </NextLink>
  </Button>
);

const NavMenu: React.FunctionComponent<{ name: string; site: SiteLink[] }> = ({
  name,
  site,
}) => {
  const [anchorElement, setAnchorElement] = useState(null);
  const classes = useStyle({});

  const handleClick = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    setAnchorElement(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorElement(null);
  };

  return (
    <Box>
      <Button variant="outlined" color="inherit" onClick={handleClick}>
        {name}
        <svg
          className={classes.svg}
          xmlns="http://www.w3.org/2000/svg"
          height="100%"
          viewBox="0 0 18 18"
          stroke="inherit"
        >
          <path d="M5 8l4 4 4-4z" />
        </svg>
      </Button>
      <Menu
        anchorEl={anchorElement}
        keepMounted
        open={Boolean(anchorElement)}
        onClose={handleClose}
      >
        {site.map(data => (
          <MenuItem onClick={handleClose} key={data.name}>
            <NavLink {...data} />
          </MenuItem>
        ))}
      </Menu>
    </Box>
  );
};

const Navbar = () => {
  const classes = useStyle({});
  return (
    <React.Fragment>
      <AppBar position="fixed" style={{ height: 'auto' }}>
        <Toolbar>
          <Box className={classes.root}>
            <Box flex="1 0 auto" display="flex" alignItems="center">
              <Typography>Dev Project</Typography>
            </Box>

            <Box
              flex="3 0 auto"
              display="flex"
              justifyContent="space-between"
              alignItems="center"
            >
              <Box
                className={classes.separator}
                display="flex"
                justifyContent="flex-start"
                alignItems="center"
              >
                {siteLinks.map(siteLink =>
                  (siteLink as SiteLink).link ? (
                    <NavLink
                      link={(siteLink as SiteLink).link}
                      name={siteLink.name}
                      key={siteLink.name}
                    />
                  ) : (
                    <NavMenu
                      site={(siteLink as ComposedSiteLink).site}
                      name={siteLink.name}
                      key={siteLink.name}
                    />
                  )
                )}
              </Box>
              <Box display="flex">
                <LoginDialog />

                <Button variant="text" color="inherit">
                  Logout
                </Button>
              </Box>
            </Box>
          </Box>
        </Toolbar>
      </AppBar>
      <Toolbar />
    </React.Fragment>
  );
};

export default Navbar;
