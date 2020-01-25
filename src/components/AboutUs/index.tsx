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
  socialLinks: string[];
}

const personData: PersonDataInterface[] = [
  {
    name: 'MArk Zuckeberg',
    description: 'Our Lord and Savior, Mark zuckerberg',
    socialLinks: ['Gtihub', 'twitter', 'instagram'],
  },
  {
    name: 'Carlos Tamez',
    description: 'CS student at Tecnologico de Monterrey',
    socialLinks: ['Gtihub', 'twitter', 'instagram'],
  },
  {
    name: 'Alfredo Salazar',
    description: 'CS student at Tecnologico de Monterrey',
    socialLinks: ['Gtihub', 'twitter', 'instagram'],
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
}) => {
  const classes = useStyles({});
  return (
    <Card className={classes.card}>
      <CardContent>
        <Avatar
          className={classes.ourFaces}
          src="./nissim.jpg"
          alt="Nissim Betesh"
        />
        <CardActions disableSpacing>
          <Link href="https://www.github.com/">{socialLinks[0]}</Link>
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
      {/* estudiantes del tec de mty */}
      <Typography paragraph>
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Commodi ea
        tenetur nulla ab sapiente perferendis hic, dolore dolores deleniti minus
        debitis quibusdam illo at excepturi delectus ad omnis, nobis similique.
      </Typography>
      {/* proyecto de desarrollo de aplicaciones */}
      <Typography paragraph>
        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ducimus fuga
        atque libero? Obcaecati veritatis eaque dolorum. Placeat facilis impedit
        explicabo ut, fuga veniam illo ipsa harum dolores perspiciatis
        reiciendis quod dolor sit animi sint distinctio!
      </Typography>
      {/* objetivo del proyecto */}
      <Typography paragraph>
        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Minus quae vel
        labore eveniet iure ullam quibusdam est deserunt optio, nemo fugit
        maxime, voluptates neque? Culpa ut minima repellat consequuntur
        consequatur quaerat laudantium, ipsam mollitia? Repudiandae at magni est
        hic porro.
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
