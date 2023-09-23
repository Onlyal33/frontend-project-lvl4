import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { io } from 'socket.io-client';
import './assets/application.scss';
import init from './initialize';

const app = async () => {
  const rootEl = document.querySelector('#chat');
  if (rootEl) {
    const socket = io();
    const vdom = await init(socket);
    createRoot(rootEl).render(<StrictMode>{vdom}</StrictMode>);
  }
};

app();
