import { configureStore } from '@reduxjs/toolkit';

import messagesReducer from '../features/messages/messagesSlice';
import channelsReducer from '../features/channels/channelsSlice';

const store = configureStore({
  reducer: {
    messages: messagesReducer,
    channels: channelsReducer,
  },
});

export default store;
