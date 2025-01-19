import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
  name: 'users',
  initialState: {
    selectedUser: {},
  },
  reducers: {
    selectUser: (state, action) => {
      state.selectedUser = action.payload;
    },
  },
});

export const { selectUser } = userSlice.actions;
export default userSlice.reducer;