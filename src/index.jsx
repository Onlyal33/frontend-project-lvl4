// @ts-check
import 'core-js/stable';
import 'regenerator-runtime/runtime';
import '../assets/application.scss';
// @ts-ignore
import gon from 'gon';
import { io } from 'socket.io-client';
import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import App from './app/App.jsx';
import store from './app/store';
import { addMessage } from './features/messages/messagesSlice';
import { addChannel, removeChannel, renameChannel } from './features/channels/channelsSlice';

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

console.log('it works!?');
console.log('gon', gon);
