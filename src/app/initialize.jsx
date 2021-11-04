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
import modalsReducer from '../features/modals/modalsSlice.js';

export default (initData) => {
  const store = configureStore({
    reducer: {
      channelsInfo: channelsReducer,
      messages: messagesReducer,
      modalInfo: modalsReducer,
    },
    preloadedState: {
      channelsInfo: {
        channels: initData.channels,
        currentChannelId: initData.currentChannelId,
      },
      messages: initData.messages,
    },
  });

  const socket = io();

  socket.on('newMessage', (payload) => {
    store.dispatch(addMessage(payload));
  });

  socket.on('newChannel', (payload) => {
    store.dispatch(addChannel(payload));
  });

  socket.on('removeChannel', (payload) => {
    store.dispatch(removeChannel(payload));
  });

  socket.on('renameChannel', (payload) => {
    store.dispatch(renameChannel(payload));
  });

  const container = document.querySelector('#chat');

  render(
    <Provider store={store}>
      <App />
    </Provider>,
    container,
  );
};
