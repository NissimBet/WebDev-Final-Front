import React, { useState } from 'react';
import { LeagueBuildData } from '../../../utils/DBInterfaces';
import {
  SetLeagueBuildPrivacyFunction,
  RemoveLeagueBuildFunction,
} from '../../../utils/Queries';
import {
  Box,
  Button,
  Typography,
  Divider,
  makeStyles,
} from '@material-ui/core';
import LeagueItem from './LeagueItem';

const useStyles = makeStyles(theme => ({
  removeButton: {
    borderRadius: '50%',
    backgroundColor: theme.palette.error.main,
    color: theme.palette.error.contrastText,
    minWidth: 0,
    width: theme.spacing(3),
    height: theme.spacing(3),
    lineHeight: 1,
  },
  buildContainer: {
    border: `1px solid ${theme.palette.primary.light}`,
    boxShadow: theme.shadows[1],
    margin: theme.spacing(2),
    padding: theme.spacing(2),
    display: 'flex',
    flexDirection: 'column',
    '& img': {
      maxWidth: '50px',
      maxHeight: '50px',
      objectFit: 'contain',
    },
  },
}));

const LeagueBuild: React.FunctionComponent<{
  buildData: LeagueBuildData;
  handleChangePrivacy?: SetLeagueBuildPrivacyFunction;
  handleRemoveBuild?: RemoveLeagueBuildFunction;
  isEditable?: boolean;
}> = ({
  buildData: { _id, items, private: isPrivate, champion },
  handleChangePrivacy,
  handleRemoveBuild,
  isEditable = false,
}) => {
  const classes = useStyles({});
  const [status, setStatus] = useState(isPrivate);
  const [queryLoading, setQueryLoading] = useState(false);
  return (
    <Box className={classes.buildContainer}>
      {isEditable && (
        <Box marginLeft="auto">
          <Button
            className={classes.removeButton}
            type="button"
            onClick={() => handleRemoveBuild(_id)}
          >
            x
          </Button>
        </Box>
      )}
      <Box
        display="flex"
        flexDirection="row"
        flexWrap="wrap"
        justifyContent="center"
      >
        {items.map((item, index) => (
          <Box
            key={`${item._id} - ${index}`}
            width={[1 / 2, 1 / 2, 1 / 3]}
            padding={2}
          >
            <LeagueItem {...item} />
          </Box>
        ))}
      </Box>
      <Divider light />
      <Box
        display="flex"
        marginY={3}
        alignItems="center"
        flexDirection="column"
      >
        <img
          src={`https://ddragon.leagueoflegends.com/cdn/10.2.1/img/champion/${champion.id}.png`}
          width="65px"
          height="65px"
          alt={champion.name}
        />
        <Typography variant="h6">{champion.name}</Typography>
      </Box>
      <Divider light />
      <Box marginY={1}>
        <Typography variant="caption">
          {status
            ? 'This build is currently private and is not currently shared with other people'
            : 'This build is currently public and anyone can see it'}
        </Typography>
      </Box>
      {isEditable && (
        <Button
          disabled={queryLoading}
          onClick={async () => {
            setQueryLoading(true);
            await handleChangePrivacy(_id, !status);
            setQueryLoading(false);
            setStatus(!status);
          }}
          variant="outlined"
          fullWidth
        >
          Click here to make it {status ? 'public' : 'private'}
        </Button>
      )}
    </Box>
  );
};

export default LeagueBuild;
