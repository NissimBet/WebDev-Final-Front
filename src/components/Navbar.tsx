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
  Drawer,
  List,
  ListItem,
  Divider,
} from '@material-ui/core';

import LoginDialog from './Login/LoginPopup';
import { logout } from '../utils/Authentication';
import { useLoginContext } from '../utils/UserContext';
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
    link: '/about-us',
  },
  {
    name: 'Contact Us',
    link: '/contact-us',
  },
  {
    name: 'games',
    site: [
      {
        name: 'League of Legends',
        link: '/games/league',
      },
      /* {
        name: 'Dota 2',
        link: '/',
      },
      {
        name: 'Overwatch',
        link: '/',
      }, */
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
  mainBg: {
    backgroundColor: theme.palette.primary.main,
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
      <Button variant="text" color="inherit" onClick={handleClick}>
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

const Navbar = ({ isLoggedIn }: { isLoggedIn: Boolean }) => {
  const classes = useStyle({});
  const [drawerOpen, setDrawerOpen] = useState(false);
  return (
    <React.Fragment>
      <AppBar position="fixed" style={{ height: 'auto' }}>
        <Toolbar className={classes.mainBg}>
          <Box className={classes.root}>
            <Box flex="1 0 auto" display="flex" alignItems="center">
              <Typography>Game Monitor</Typography>
            </Box>

            <Box
              flex="3 0 auto"
              display={['none', 'flex']}
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
                {!isLoggedIn && <LoginDialog />}
                {isLoggedIn && <NavLink link="/user" name="Profile" />}

                {isLoggedIn && (
                  <Button
                    variant="text"
                    color="inherit"
                    onClick={() => {
                      logout();
                    }}
                  >
                    Logout
                  </Button>
                )}
              </Box>
            </Box>
          </Box>

          {/* Mobile Drawer */}
          <Box display={['initial', 'none']}>
            <Button onClick={() => setDrawerOpen(!drawerOpen)}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="32"
                height="32"
                viewBox="0 0 24 24"
              >
                <path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z" />
              </svg>
            </Button>
            <Drawer
              anchor="left"
              open={drawerOpen}
              onClose={() => setDrawerOpen(false)}
            >
              <List>
                {siteLinks.map(siteLink =>
                  (siteLink as SiteLink).link ? (
                    <ListItem>
                      <NavLink
                        link={(siteLink as SiteLink).link}
                        name={siteLink.name}
                        key={siteLink.name}
                      />
                    </ListItem>
                  ) : (
                    <React.Fragment>
                      <Divider />
                      {(siteLink as ComposedSiteLink).site.map(site => (
                        <ListItem>
                          <NavLink
                            link={site.link}
                            name={site.name}
                            key={site.name}
                          />
                        </ListItem>
                      ))}
                      <Divider />
                    </React.Fragment>
                  )
                )}
                {isLoggedIn && (
                  <ListItem>
                    <NavLink link={'/user'} name={'Profile'} />
                  </ListItem>
                )}
                {isLoggedIn && (
                  <ListItem>
                    <Button
                      variant="text"
                      color="inherit"
                      onClick={() => {
                        logout();
                      }}
                    >
                      Logout
                    </Button>
                  </ListItem>
                )}
                {!isLoggedIn && (
                  <ListItem>
                    <NavLink link={'/login'} name={'Login'} />
                  </ListItem>
                )}
              </List>
            </Drawer>
          </Box>
        </Toolbar>
      </AppBar>
      <Toolbar />
    </React.Fragment>
  );
};

export default Navbar;
