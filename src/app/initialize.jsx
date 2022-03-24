import React, { useState, useMemo } from 'react';
import { I18nextProvider } from 'react-i18next';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import profanityFilter from 'leo-profanity';
import { Provider as RollbarProvider, ErrorBoundary } from '@rollbar/react';
import messagesReducer from '../features/messages/messagesSlice.js';
import channelsReducer from '../features/channels/channelsSlice.js';
import modalsReducer from '../features/modals/modalsSlice.js';
import App from './App.jsx';
import AuthContext from '../contexts/AuthContext.js';
import SocketContext from '../contexts/SocketContext.js';
import i18n from './i18n';
import ProfanityFilterContext from '../contexts/ProfanityFilterContext.js';

const rollbarConfig = {
  accessToken: '8764dafc54524eae9c76473f57826b59',
  environment: 'production',
};

const ProfanityFilterProvider = ({ children }) => {
  profanityFilter.add(profanityFilter.getDictionary('ru'));

  return (
    <ProfanityFilterContext.Provider value={profanityFilter}>
      {children}
    </ProfanityFilterContext.Provider>
  );
};

const AuthProvider = ({ children }) => {
  const [loggedIn, setLoggedIn] = useState(!!localStorage.getItem('userId'));

  const logIn = (data) => {
    const userId = JSON.stringify(data.token);
    const username = JSON.stringify(data.username);
    localStorage.setItem('userId', userId);
    localStorage.setItem('username', username);
    setLoggedIn(true);
  };

  const logOut = () => {
    localStorage.removeItem('userId');
    localStorage.removeItem('username');
    setLoggedIn(false);
  };

  const getUsername = () => JSON.parse(localStorage.getItem('username'));

  const getUserId = () => JSON.parse(localStorage.getItem('userId'));

  const authData = useMemo(() => ({
    loggedIn, logIn, logOut, getUsername, getUserId,
  }));

  return (
    <AuthContext.Provider value={authData}>
      {children}
    </AuthContext.Provider>
  );
};

export default async (socket) => {
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

  const SocketProvider = ({ children }) => (
    <SocketContext.Provider value={socket}>
      {children}
    </SocketContext.Provider>
  );

  return (
    <RollbarProvider config={rollbarConfig}>
      <ErrorBoundary>
        <I18nextProvider i18n={i18n}>
          <Provider store={store}>
            <SocketProvider>
              <ProfanityFilterProvider>
                <AuthProvider>
                  <App />
                </AuthProvider>
              </ProfanityFilterProvider>
            </SocketProvider>
          </Provider>
        </I18nextProvider>
      </ErrorBoundary>
    </RollbarProvider>
  );
};
