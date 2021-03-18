/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

const channelsSlice = createSlice({
  name: 'channelsInfo',
  initialState: {},
  reducers: {
    addChannel(state, action) {
      const { attributes } = action.payload.data;
      state.channels.push(attributes);
    },
    removeChannel(state, action) {
      const idToRemove = action.payload.data.id;
      state.channels = state.channels.filter(({ id }) => id !== idToRemove);
      if (state.currentChannelId === idToRemove) {
        state.currentChannelId = state.channels[0]?.id;
      }
    },
    renameChannel(state, action) {
      const channel = state.channels.find(({ id }) => id === action.payload.data.id);
      channel.name = action.payload.data.attributes.name;
    },
    changeCurrentChannel(state, action) {
      state.currentChannelId = action.payload.data.id;
    },
  },
});

export const {
  addChannel, removeChannel, renameChannel, changeCurrentChannel,
} = channelsSlice.actions;

export default channelsSlice.reducer;
