import 'core-js/stable/index.js';
import 'regenerator-runtime/runtime.js';
import { io } from 'socket.io-client';
import { render } from 'react-dom';
import 'react-toastify/dist/ReactToastify.css';

import '../assets/application.scss';

import init from './app/initialize.jsx';

if (process.env.NODE_ENV !== 'production') {
  localStorage.debug = 'chat:*';
}

const run = async () => {
  const socket = io();

  const Vdom = await init(socket);

  const container = document.querySelector('#chat');

  render(
    Vdom,
    container,
  );
};

run();
