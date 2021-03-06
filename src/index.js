// @ts-check

import 'core-js/stable';
import 'regenerator-runtime/runtime';

import '../assets/application.scss';

import faker from 'faker';
import gon from 'gon';
import Cookies from 'js-cookie';
import io from 'socket.io-client';
import React from 'react';
import { render } from 'react-dom';
import App from './components/App.jsx';

if (process.env.NODE_ENV !== 'production') {
  localStorage.debug = 'chat:*';
}
//const container = document.querySelector('#chat');
console.log('it works!');
console.log('gon', gon);

let nickname = Cookies.get('nickname');
if (!nickname) {
  nickname = faker.internet.userName();
  Cookies.set('nickname', nickname);
}

const nicknameContext = React.createContext(nickname);

/* const socket = io('http://localhost');
socket.on('news', (data) => {
  console.log(data);
  socket.emit('my other event', { my: 'data' });
}); */

render(
  <nicknameContext.Provider value = {nickname}>
    <App data={gon} />
  </nicknameContext.Provider>,
  document.getElementById('chat')
  );
