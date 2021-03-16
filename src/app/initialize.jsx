import { io } from 'socket.io-client';
import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import App from './App.jsx';
import messagesReducer, { addMessage } from '../features/messages/messagesSlice.js';
import channelsReducer, {
  addChannel, removeChannel, renameChannel,
} from '../features/channels/channelsSlice.js';

export default (initData) => {
  const store = configureStore({
    reducer: {
      channelsInfo: channelsReducer,
      messages: messagesReducer,
    },
    preloadedState: {
      channelsInfo: {
        channels: initData.channels,
        currentChannelId: initData.currentChannelId,
      },
      messages: initData.messages,
    },
  });

  const defaultChannelId = initData.currentChannelId;

  const socket = io();

  socket.on('newMessage', (payload) => {
    store.dispatch(addMessage(payload));
  });

  socket.on('newChannel', (payload) => {
    store.dispatch(addChannel(payload));
  });

  socket.on('removeChannel', (payload) => {
    store.dispatch(removeChannel({ ...payload, data: { ...payload.data, defaultChannelId } }));
  });

  socket.on('renameChannel', (payload) => {
    store.dispatch(renameChannel(payload));
  });

  if (process.env.NODE_ENV !== 'production') {
    localStorage.debug = 'chat:*';
  }

  const container = document.querySelector('#chat');

  render(
    <Provider store={store}>
      <App />
    </Provider>,
    container,
  );
};
