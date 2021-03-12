import { createSlice } from '@reduxjs/toolkit';
import { removeChannel } from '../channels/channelsSlice.js';

const messagesSlice = createSlice({
  name: 'messages',
  initialState: [],
  reducers: {
    addMessage(state, action) {
      const message = action.payload.data.attributes;
      state.push(message);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(removeChannel, (state, action) => {
        const channelIdToRemove = action.payload.data.id;
        return state.filter(({ channelId }) => channelId !== channelIdToRemove);
      });
  },
});

export const { addMessage } = messagesSlice.actions;

export default messagesSlice.reducer;
