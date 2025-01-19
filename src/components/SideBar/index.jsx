import React, { useEffect, useState } from 'react';
import { useDispatch,useSelector } from 'react-redux';
import SearchIcon from '@mui/icons-material/Search';
import CloseIcon from '@mui/icons-material/Close';
import { List, ListItem, ListItemText, Paper, CircularProgress, Pagination, Box, TextField, InputAdornment, IconButton, Typography } from '@mui/material';
import { selectUser } from '../../redux/UserSlice/userSlice';
import { useGetUsersQuery } from '../../redux/api';
import { useDebounce } from '../Utils/useDebounce';
import UserSkeleton from './UserSkeleton';

const Sidebar = () => {
  const dispatch = useDispatch();
  const [page, setPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const debouncedSearch=useDebounce(searchTerm);
  const selectedUser = useSelector((state) => state.users.selectedUser);

  const { data={}, isLoading, error } = useGetUsersQuery({
    skip:(page-1)*10,
    search:debouncedSearch
  })


  useEffect(() => {
    if (data?.users?.length > 0) {
      dispatch(selectUser(data.users[0]));
    }
  }, [data, dispatch]);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
    setPage(1); 
  };

  const clearSearch = () => {
    setSearchTerm('');
    setPage(1);
  };

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };


  const renderContent = () => {
    if (error) {
      return (
        <Box sx={{ p: 2, textAlign: 'center' }}>
          <Typography color="error">Error loading users</Typography>
        </Box>
      );
    }

    if (isLoading) {
      return (
        <List>
          {[...Array(10)].map((_, index) => (
            <UserSkeleton key={index} />
          ))}
        </List>
      );
    }

    if (data?.users.length === 0) {
      return (
        <Box sx={{ p: 2, textAlign: 'center' }}>
          <Typography color="text.secondary">
            No users found
          </Typography>
        </Box>
      );
    }

    return (
      <List>
        {data?.users?.map((user) => (
          <ListItem
            sx={{cursor:'pointer',borderRadius:1,backgroundColor:user?.id===selectedUser?.id?"#eee":"#fff"}}
        
            key={user.id}
            onClick={() => dispatch(selectUser(user))}
          >
            <ListItemText primary={user.firstName} />
          </ListItem>
        ))}
      </List>
    );
  };


  return (
    <Paper elevation={3} sx={{ width: 240, height: '100vh',px:1 }}>
      <Box sx={{pt:2,pb:3}}>
        <Typography sx={{fontWeight:600}} variant='h5'>
          Users List
        </Typography>
      </Box>
      <Box sx={{borderBottom: 1, borderColor: 'divider',pb:2 }}>
        <TextField
          fullWidth
          size="small"
          placeholder="Search users..."
          value={searchTerm}
          onChange={handleSearchChange}
          slotProps={{
            input:{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon color="action" />
                </InputAdornment>
              ),
              endAdornment: searchTerm && (
                <InputAdornment position="end">
                  <IconButton
                    size="small"
                    onClick={clearSearch}
                    edge="end"
                  >
                    <CloseIcon />
                  </IconButton>
                </InputAdornment>
              )
            }
          }}
        />
      </Box>


      <Box sx={{ flexGrow: 1, overflow: 'auto' }}>
        {renderContent()}
      </Box>
      <Box>

      <Pagination
            count={Math.ceil(data?.total / 10)}
            page={page}
            onChange={handlePageChange}
            size="small"
            sx={{width:"100%",display:'flex',justifyContent:'center'}}
            siblingCount={0}
      />
      </Box>
    </Paper>
  );
};

export default Sidebar;