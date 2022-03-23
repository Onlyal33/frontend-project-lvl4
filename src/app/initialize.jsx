import { io } from 'socket.io-client';
import React from 'react';
import { render } from 'react-dom';
import { I18nextProvider } from 'react-i18next';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import profanityFilter from 'leo-profanity';
import messagesReducer from '../features/messages/messagesSlice.js';
import channelsReducer from '../features/channels/channelsSlice.js';
import modalsReducer from '../features/modals/modalsSlice.js';
import App from './App.jsx';
import SocketContext from '../contexts/SocketContext.js';
import i18n from './i18n';
import ProfanityFilterContext from '../contexts/ProfanityFilterContext.js';

const SocketProvider = ({ children }) => {
  const socket = io();

  return (
    <SocketContext.Provider value={socket}>
      {children}
    </SocketContext.Provider>
  );
};

const ProfanityFilterProvider = ({ children }) => {
  profanityFilter.add(profanityFilter.getDictionary('ru'));

  return (
    <ProfanityFilterContext.Provider value={profanityFilter}>
      {children}
    </ProfanityFilterContext.Provider>
  );
};

export default async () => {
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
          <ProfanityFilterProvider>
            <App />
          </ProfanityFilterProvider>
        </SocketProvider>
      </Provider>
    </I18nextProvider>,
    container,
  );
};
