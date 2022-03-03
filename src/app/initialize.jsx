import { io } from 'socket.io-client';
import React from 'react';
import { render } from 'react-dom';
import i18n from 'i18next';
import { initReactI18next, I18nextProvider } from 'react-i18next';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import messagesReducer from '../features/messages/messagesSlice.js';
import channelsReducer from '../features/channels/channelsSlice.js';
import modalsReducer from '../features/modals/modalsSlice.js';
import App from './App.jsx';
import SocketContext from '../contexts/SocketContext.js';
import resources from '../locales/index.js';

const SocketProvider = ({ children }) => {
  const socket = io();

  return (
    <SocketContext.Provider value={socket}>
      {children}
    </SocketContext.Provider>
  );
};

export default async () => {
  await i18n
    .use(initReactI18next)
    .init({
      fallbackLng: 'en',
      debug: false,

      interpolation: {
        escapeValue: false, // not needed for react as it escapes by default
      },
      resources,
    });

  const store = configureStore({
    reducer: {
      channelsInfo: channelsReducer,
      messages: messagesReducer,
      modalInfo: modalsReducer,
    },
    preloadedState: {
      channelsInfo: {
        channels: [],
        currentChannelId: null,
      },
      messages: [],
    },
  });

  const container = document.querySelector('#chat');

  render(
    <I18nextProvider i18n={i18n}>
      <Provider store={store}>
        <SocketProvider>
          <App />
        </SocketProvider>
      </Provider>
    </I18nextProvider>,
    container,
  );
};
