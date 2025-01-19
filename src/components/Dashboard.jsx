import React, { useState } from 'react';
import { Box, Tab, Tabs } from '@mui/material';
import Sidebar from './SideBar';
import UserDetails from './UserDetails';
import TodoComponent from './TodoComponent';
// import TodoList from './TodoList';

const Dashboard = () => {
  const [selectedTab, setSelectedTab] = useState(0);

  return (
    <Box sx={{ display: 'flex' }}>
      <Sidebar />
      <Box sx={{ flex: 1, p: 3 }}>
        <Tabs
          value={selectedTab}
          onChange={(_, newValue) => setSelectedTab(newValue)}
        >
          <Tab label="User Details" />
          <Tab label="Todos" />
        </Tabs>
        <Box sx={{ mt: 2 }}>
          {selectedTab === 0 ? <UserDetails /> :<TodoComponent/> }
        </Box>
      </Box>
    </Box>
  );
};

export default Dashboard;