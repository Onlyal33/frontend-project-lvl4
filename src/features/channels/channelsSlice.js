/* eslint-disable no-param-reassign */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import gon from 'gon';
import routes from '../../common/routes';

const { currentChannelId, channels } = gon;
const byId = Object.fromEntries(channels.map((channel) => [channel.id, channel]));
const allIds = channels.map((channel) => channel.id);
const initialState = { byId, allIds, currentChannelId };

const channelsSlice = createSlice({
  name: 'channels',
  initialState,
  reducers: {
    changeCurrentChannel(state, action) {
      const { id } = action.payload;
      state.currentChannelId = id;
    },
    addChannel(state, action) {
      const { id, attributes } = action.payload.data;
      state.byId[id] = attributes;
      state.allIds.push(id);
    },
    removeChannel(state, action) {
      const idToRemove = action.payload.data.id;
      const filtered = Object.entries(state.byId)
        .filter(([, { id }]) => id !== idToRemove);
      state.byId = Object.fromEntries(filtered);
      state.allIds = filtered.map(([id]) => id);
    },
    renameChannel(state, action) {
      const { id, attributes } = action.payload.data;
      state.byId[id] = attributes;
    },
  },
});

export const {
  changeCurrentChannel, addChannel, removeChannel, renameChannel,
} = channelsSlice.actions;

export const newChannelThunk = createAsyncThunk(
  'channels/newChannel',
  async (attributes, thunkAPI) => {
    const path = routes.channelsPath();
    try {
      const response = await axios.post(path, { data: { attributes } });
      return response.data;
    } catch (e) {
      return thunkAPI.rejectWithValue(e.message);
    }
  },
);

export const deleteChannelThunk = createAsyncThunk(
  'channels/deleteChannel',
  async (attributes, thunkAPI) => {
    const path = routes.channelPath(attributes.id);
    try {
      const response = await axios.delete(path);
      return response.data;
    } catch (e) {
      return thunkAPI.rejectWithValue(e.message);
    }
  },
);

export const patchChannelThunk = createAsyncThunk(
  'channels/patchChannel',
  async (attributes, thunkAPI) => {
    const path = routes.channelPath(attributes.id);
    try {
      const response = await axios.patch(path, { data: { attributes } });
      return response.data;
    } catch (e) {
      return thunkAPI.rejectWithValue(e.message);
    }
  },
);

export default channelsSlice.reducer;
