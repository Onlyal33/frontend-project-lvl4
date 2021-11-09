/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

const channelsSlice = createSlice({
  name: 'channelsInfo',
  initialState: {},
  reducers: {
    setInitialState(state, action) {
      state.channels = action.payload.channels;
      state.currentChannelId = action.payload.currentChannelId;
    },
    addChannel(state, action) {
      state.channels.push(action.payload);
    },
    removeChannel(state, action) {
      const idToRemove = action.payload.id;
      state.channels = state.channels.filter(({ id }) => id !== idToRemove);
      if (state.currentChannelId === idToRemove) {
        state.currentChannelId = state.channels[0]?.id;
      }
    },
    renameChannel(state, action) {
      const channel = state.channels.find(({ id }) => id === action.payload.id);
      channel.name = action.payload.name;
    },
    changeCurrentChannel(state, action) {
      state.currentChannelId = action.payload.id;
    },
  },
});

export const {
  setInitialState,
  addChannel,
  removeChannel,
  renameChannel,
  changeCurrentChannel,
} = channelsSlice.actions;

export default channelsSlice.reducer;
