import React from 'react';
import { Provider } from 'react-redux';
import { CssBaseline } from '@mui/material';
import { store } from './redux/store';
import Dashboard from './components/Dashboard';

const App = () => {
  return (
    <Provider store={store}>
      <CssBaseline />
      <Dashboard />
    </Provider>
  );
};

export default App
