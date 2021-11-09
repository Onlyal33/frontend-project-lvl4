import { createSlice } from '@reduxjs/toolkit';
import { removeChannel, setInitialState } from '../channels/channelsSlice.js';

const messagesSlice = createSlice({
  name: 'messages',
  initialState: [],
  reducers: {
    addMessage(state, action) {
      state.push(action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(removeChannel, (state, action) => {
        const channelIdToRemove = action.payload.data.id;
        return state.filter(({ channelId }) => channelId !== channelIdToRemove);
      })
      .addCase(setInitialState, (state, action) => action.payload.messages);
  },
});

export const { addMessage } = messagesSlice.actions;

export default messagesSlice.reducer;
