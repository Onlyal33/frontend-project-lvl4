/* eslint-disable no-param-reassign */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import routes from '../../common/routes.js';
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

export const sendMessageThunk = createAsyncThunk(
  'messages/sendMessage',
  async (attributes, thunkAPI) => {
    const { currentChannelId } = thunkAPI.getState();
    const path = routes.channelMessagesPath(currentChannelId);
    try {
      const response = await axios.post(path, { data: { attributes } });
      return response.data;
    } catch (e) {
      return thunkAPI.rejectWithValue(e.message);
    }
  },
);

export default messagesSlice.reducer;
