import { createSlice } from '@reduxjs/toolkit';

const messagesSlice = createSlice({
  name: 'messages',
  initialState: [],
  reducers: {
    addMessage(state, action) {
      const { id, nickname, body, channelId } = action.payload;
      state.push({ id, nickname, body, channelId });
    },
  },
});

export const { addMessage } = messagesSlice.actions;

export default messagesSlice.reducer;
