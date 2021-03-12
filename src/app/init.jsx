// @ts-check
import 'core-js/stable';
import 'regenerator-runtime/runtime';
import '../../assets/application.scss';
import { io } from 'socket.io-client';
import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import App from './App.jsx';
import messagesReducer, { addMessage } from '../features/messages/messagesSlice.js';
import channelsReducer, { addChannel, removeChannel, renameChannel } from '../features/channels/channelsSlice.js';
import currentChannelReducer from '../features/channels/currentChannelSlice.js';

export default (initData) => {
  const store = configureStore({
    reducer: {
      channels: channelsReducer,
      messages: messagesReducer,
      currentChannelId: currentChannelReducer,
    },
    preloadedState: {
      channels: initData.channels,
      messages: initData.messages,
      currentChannelId: initData.currentChannelId,
    },
  });

  const socket = io();

  socket.on('newMessage', (data) => {
    store.dispatch(addMessage(data));
  });

  socket.on('newChannel', (data) => {
    store.dispatch(addChannel(data));
  });

  socket.on('removeChannel', (data) => {
    store.dispatch(removeChannel(data));
  });

  socket.on('renameChannel', (data) => {
    store.dispatch(renameChannel(data));
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
