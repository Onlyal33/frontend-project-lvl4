import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { removeChannel, setInitialState } from '../channels';
import { MessageType, MessagesType } from '../../../types';

const initialState: MessagesType = [];

const messagesSlice = createSlice({
  name: 'messages',
  initialState,
  reducers: {
    newMessage(state, action: PayloadAction<MessageType>) {
      state.push(action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(removeChannel, (state, action) => {
        const channelIdToRemove = action.payload.id;
        return state.filter(({ channelId }) => channelId !== channelIdToRemove);
      })
      .addCase(setInitialState, (state, action) => action.payload.messages);
  },
});

export const { newMessage } = messagesSlice.actions;

export default messagesSlice.reducer;
