/* eslint-disable no-param-reassign */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import routes from '../../common/routes.js';

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
