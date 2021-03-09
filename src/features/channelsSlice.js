/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';
import gon from 'gon';

const { currentChannelId, channels } = gon;
const byId = Object.fromEntries(channels.map((channel) => [channel.id, channel]));
const allIds = channels.map((channel) => channel.id);
const initialState = { byId, allIds, currentChannelId };

const channelsSlice = createSlice({
  name: 'channels',
  initialState,
  reducers: {
    removeChannel(state, action) {
      const idToRemove = action.payload.id;
      const filtered = Object.entries(state.byId)
        .filter(([{ id }]) => id !== idToRemove);
      state.byId = Object.fromEntries(filtered);
      state.allIds = filtered.map(([id]) => id);
    },
  },
});

export const { removeChannel } = channelsSlice.actions;

export default channelsSlice.reducer;
