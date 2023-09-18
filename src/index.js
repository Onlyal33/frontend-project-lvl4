import { io } from 'socket.io-client';
import { createRoot } from 'react-dom/client';
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
  const root = createRoot(container);
  root.render(Vdom);
};

run();
