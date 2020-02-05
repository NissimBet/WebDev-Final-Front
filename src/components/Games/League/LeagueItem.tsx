import React from 'react';
import { LeagueItemData } from '../../../utils/DBInterfaces';
import { Box, Typography } from '@material-ui/core';

const LeagueItem: React.FunctionComponent<LeagueItemData> = ({
  image,
  name,
}) => {
  return (
    <Box display="flex" alignItems="center" flexDirection="column" marginY={1}>
      <img
        src={`http://ddragon.leagueoflegends.com/cdn/10.2.1/img/item/${image}`}
        alt={name}
      />
      <Typography align="center" variant="subtitle2">
        {name}
      </Typography>
    </Box>
  );
};

export default LeagueItem;
