import { createSlice } from '@reduxjs/toolkit';

const currentChannelSlice = createSlice({
  name: 'currentChannelId',
  initialState: null,
  reducers: {
    changeCurrentChannel(state, action) {
      return action.payload.id;
    },
  },
});

export const { changeCurrentChannel } = currentChannelSlice.actions;

export default currentChannelSlice.reducer;
