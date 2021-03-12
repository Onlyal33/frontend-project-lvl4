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
import currentChannelReducer, { changeCurrentChannel } from '../features/channels/currentChannelSlice.js';
import defaultChannelReducer from '../features/channels/defaultChannelSlice.js';

export default (initData) => {
  const store = configureStore({
    reducer: {
      channels: channelsReducer,
      messages: messagesReducer,
      currentChannelId: currentChannelReducer,
      defaultChannelId: defaultChannelReducer,
    },
    preloadedState: {
      channels: initData.channels,
      messages: initData.messages,
      currentChannelId: initData.currentChannelId,
      defaultChannelId: initData.currentChannelId,
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
    if (store.getState().currentChannelId === payload.data.id) {
      store.dispatch(changeCurrentChannel({ data: { id: store.getState().defaultChannelId } }));
    }
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
