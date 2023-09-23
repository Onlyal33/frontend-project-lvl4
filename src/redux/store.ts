import { configureStore } from '@reduxjs/toolkit';
import messagesReducer from './features/messages';
import channelsReducer from './features/channels';
import modalReducer from './features/modals';

const store = configureStore({
  reducer: {
    channels: channelsReducer,
    messages: messagesReducer,
    modal: modalReducer,
  },
  preloadedState: {
    channels: {
      list: [],
      currentId: null,
    },
    messages: [],
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
