import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { ChannelType, ChannelsType, MessagesType } from '../../../types';

type ChannelsState = {
  list: ChannelsType;
  currentId: string | null;
};

const initialState: ChannelsState = { list: [], currentId: null };

const channelsSlice = createSlice({
  name: 'channels',
  initialState,
  reducers: {
    setInitialState(
      state,
      action: PayloadAction<{
        channels: ChannelsType;
        currentChannelId: ChannelsState['currentId'];
        messages: MessagesType;
      }>,
    ) {
      state.list = action.payload.channels;
      state.currentId = action.payload.currentChannelId;
    },
    newChannel(state, action: PayloadAction<ChannelType>) {
      state.list.push(action.payload);
    },
    removeChannel(state, action: PayloadAction<ChannelType>) {
      const idToRemove = action.payload.id;
      state.list = state.list.filter(({ id }) => id !== idToRemove);
      if (state.currentId === idToRemove) {
        state.currentId = state.list[0]?.id;
      }
    },
    renameChannel(state, action: PayloadAction<ChannelType>) {
      const channel = state.list.find(({ id }) => id === action.payload.id);
      if (channel) {
        channel.name = action.payload.name;
      }
    },
    changeCurrentChannel(state, action: PayloadAction<{ id: string }>) {
      state.currentId = action.payload.id;
    },
  },
});

export const {
  setInitialState,
  newChannel,
  removeChannel,
  renameChannel,
  changeCurrentChannel,
} = channelsSlice.actions;

export default channelsSlice.reducer;
