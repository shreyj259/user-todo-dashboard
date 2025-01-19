import { configureStore } from '@reduxjs/toolkit';
import userReducer from './UserSlice/userSlice';
import { api } from './api';

export const store = configureStore({
  reducer: {
    users: userReducer,
    [api.reducerPath]: api.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware),
});
