/* eslint-disable no-param-reassign */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import gon from 'gon';
import routes from '../routes';
import { removeChannel } from './channelsSlice';

const { messages } = gon;
const byId = Object.fromEntries(messages.map((item) => [item.id, item]));
const allIds = messages.map((item) => item.id);
const initialState = { byId, allIds };

const messagesSlice = createSlice({
  name: 'messages',
  initialState,
  reducers: {
    addMessage(state, action) {
      const { id, attributes } = action.payload.data;
      state.byId[id] = attributes;
      state.allIds.push(id);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(removeChannel, (state, action) => {
        const idToRemove = action.payload.id;
        const filtered = Object.entries(state.byId)
          .filter(([{ channelId }]) => channelId !== idToRemove);
        state.byId = Object.fromEntries(filtered);
        state.allIds = filtered.map(([id]) => id);
      })
      .addDefaultCase((state) => state);
  },
});

export const { addMessage } = messagesSlice.actions;

export const sendMessageThunk = createAsyncThunk(
  'messages/sendMessage',
  async (attributes, thunkAPI) => {
    const { currentChannelId } = thunkAPI.getState().channels;
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
