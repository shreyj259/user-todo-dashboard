import React from 'react';
import { ListItem, Skeleton, Box } from '@mui/material';

const UserSkeleton = () => (
  <ListItem sx={{p:0}}>
    <Box sx={{ width: '100%' }}>
      <Skeleton animation="wave" height={48} width="100%" />
    </Box>
  </ListItem>
);

export default UserSkeleton;