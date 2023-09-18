import { I18nextProvider } from 'react-i18next';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { Provider as RollbarProvider, ErrorBoundary } from '@rollbar/react';
import messagesReducer from '../features/messages/messagesSlice.js';
import channelsReducer from '../features/channels/channelsSlice.js';
import modalsReducer from '../features/modals/modalsSlice.js';
import App from './App.jsx';
import AuthProvider from '../contexts/AuthContext.jsx';
import SocketProvider from '../contexts/SocketContext.jsx';
import ProfanityFilterProvider from '../contexts/ProfanityFilterContext.jsx';
import i18n from './i18n';

const rollbarConfig = {
  accessToken: process.env.REACT_APP_ROLLBAR_POST_CLIENT_ITEM_ACCESS_TOKEN,
  captureUncaught: true,
  captureUnhandledRejections: true,
  environment: 'production',
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

  return (
    <RollbarProvider config={rollbarConfig}>
      <ErrorBoundary>
        <I18nextProvider i18n={i18n}>
          <Provider store={store}>
            <SocketProvider socket={socket}>
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
