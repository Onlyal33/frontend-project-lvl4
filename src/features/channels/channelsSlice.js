/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

const channelsSlice = createSlice({
  name: 'channels',
  initialState: [],
  reducers: {
    addChannel(state, action) {
      const { attributes } = action.payload.data;
      state.push(attributes);
    },
    removeChannel(state, action) {
      const idToRemove = action.payload.data.id;
      return state.filter(({ id }) => id !== idToRemove);
    },
    renameChannel(state, action) {
      const channel = state.find(({ id }) => id === action.payload.data.id);
      channel.name = action.payload.data.attributes.name;
    },
  },
});

export const {
  addChannel, removeChannel, renameChannel,
} = channelsSlice.actions;

export default channelsSlice.reducer;
