import React, { useState } from 'react';
import {
  Box,
  Typography,
  makeStyles,
  Card,
  CardContent,
  Avatar,
  Link,
  IconButton,
  CardActions,
  Collapse,
} from '@material-ui/core';
import clsx from 'clsx';

const useStyles = makeStyles(theme => ({
  title: {
    fontSize: theme.typography.h4.fontSize,
    //textTransform: 'uppercase',
    fontWeight: theme.typography.fontWeightMedium,
  },
  ourFaces: {
    width: theme.spacing(20),
    height: theme.spacing(20),
    maxWidth: '100%',

    margin: '0 auto',
  },
  card: {
    marginTop: theme.spacing(2),

    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: '50%',
    },
    [theme.breakpoints.up('md')]: {
      width: '30%',
      maxWidth: '300px',
    },
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
}));

interface PersonDataInterface {
  name: string;
  description: string;
  socialLinks: {
    name: string;
    link: string;
    iconLink: string;
  }[];

  image: string;
}

const personData: PersonDataInterface[] = [
  {
    name: 'Nissim Betesh',
    description: 'CS Student at Tecnologico de Monterrey, 8th semester',
    socialLinks: [
      {
        name: 'Github',
        link: 'https://www.github.com/NissimBet',
        iconLink: './github.svg',
      },
      {
        name: 'Facebook',
        link: 'https://www.facebook.com/nissim.betesh.1',
        iconLink: './facebook.svg',
      },
    ],
    image: './Nissim.jpg',
  },
  {
    name: 'Alfredo Salazar',
    description:
      'Web Development Professor at Tecnologico de Monterrey and consultor at Thinkful. Master in Computer Science at ESSEX University',
    socialLinks: [
      {
        name: 'Github',
        link: 'https://www.github.com/Alfredo08',
        iconLink: './github.svg',
      },
      {
        name: 'Class Google Site',
        link: 'https://sites.google.com/site/dawinv20/',
        iconLink: './google.svg',
      },
    ],
    image: './Alfredo.jpg',
  },
  {
    name: 'Carlos Tamez',
    description: 'CS student at Tecnologico de Monterrey, 8th semester',
    socialLinks: [
      {
        name: 'Github',
        link: 'https://www.github.com/CyberFroppy',
        iconLink: './github.svg',
      },
      {
        name: 'Facebook',
        link: 'https://www.facebook.com/carlos.tamez.21',
        iconLink: './facebook.svg',
      },
    ],
    image: './Carlos.jpg',
  },
];
interface PersonCardInterface extends PersonDataInterface {
  handleArrowPress: () => void;
  expanded: boolean;
}

const Person: React.FunctionComponent<PersonCardInterface> = ({
  description,
  name,
  socialLinks,
  handleArrowPress,
  expanded,
  image,
}) => {
  const classes = useStyles({});
  return (
    <Card className={classes.card}>
      <CardContent>
        <Avatar className={classes.ourFaces} src={image} alt={name} />
        <CardActions disableSpacing>
          <Box
            display="flex"
            flexDirection="row"
            alignItems="center"
            width={1}
            justifyContent="flex-start"
            marginX="15px"
          >
            {socialLinks.map(link => (
              <Box marginRight="15px">
                <Link key={link.name} target="_blank" href={link.link}>
                  <img
                    src={link.iconLink}
                    alt="icon"
                    width="30px"
                    height="30px"
                  />
                </Link>
              </Box>
            ))}
          </Box>
          <IconButton
            className={clsx(classes.expand, {
              [classes.expandOpen]: expanded,
            })}
            onClick={handleArrowPress}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
            >
              <path d="M16.59 8.59L12 13.17 7.41 8.59 6 10l6 6 6-6z" />
            </svg>
          </IconButton>
        </CardActions>
        <Collapse in={expanded} timeout="auto" unmountOnExit>
          <Typography paragraph>{description}</Typography>
        </Collapse>
      </CardContent>
    </Card>
  );
};

export default () => {
  const classes = useStyles({});
  const [currentExpanded, setCurrentExpanded] = useState(-1);

  return (
    <Box>
      <Typography paragraph className={classes.title}>
        About us
      </Typography>
      {/*estudiantes del tec de mty*/}
      <Typography paragraph>
        We are studying Computer Science at Tecnologico de Monterrey currently
        on our 8th semester, this winter period we are coursing Web Development
        under the mentoring of our Professor Alfredo Salazar during January of
        2020.
      </Typography>
      {/* proyecto de desarrollo de aplicaciones */}
      <Typography paragraph>
        This web project is part of the course with the intention of putting
        into practice everything that we have learned through this course. Due
        to the short duration of the course it was a big challenge for us to
        complete it, but we are happy with our final version.
      </Typography>
      {/* objetivo del proyecto */}
      <Typography paragraph>
        Our objective is to help gamers who are passionate for different
        videogames like League of Legends, Dota 2, and Overwatch to share their
        builds or equipment of their favorite champions and compare them with
        other players. We believe that our project will help gamers to achieve a
        whole new level by improving their builds, therefore their number of
        victories will raise.
      </Typography>
      <Typography className={classes.title}>Who we are</Typography>
      <Box
        display="flex"
        flexDirection={['column', 'column', 'row']}
        justifyContent="space-between"
        alignItems={['stretch', 'center', 'flex-start']}
        my={[2, 0]}
      >
        {personData.map((person, index) => (
          <Person
            key={person.name}
            {...person}
            handleArrowPress={() =>
              setCurrentExpanded(index === currentExpanded ? -1 : index)
            }
            expanded={index === currentExpanded}
          />
        ))}
      </Box>
    </Box>
  );
};
