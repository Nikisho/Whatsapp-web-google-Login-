import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  roomId: null,
  targetUserPhoto: null,
  status: 'idle',
};

export const appSlice = createSlice({
  name: 'app',
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    enterRoom: (state, action) => {
      state.roomId = action.payload.roomId;
      state.targetUserPhoto = action.payload.targetUserPhoto;
    },
  },
});

export const { enterRoom } = appSlice.actions;
export const selectRoomId = (state) => state.app.roomId;
export const selectUserPhoto = (state) => state.app.targetUserPhoto;
export default appSlice.reducer;
