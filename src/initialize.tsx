import { I18nextProvider, initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import { Provider } from 'react-redux';
import { Provider as RollbarProvider, ErrorBoundary } from '@rollbar/react';
import { Socket } from 'socket.io-client';
import { createInstance } from 'i18next';
import ApiContext from './contexts/ApiContext';
import ProfanityFilterProvider from './contexts/ProfanityFilterContext';
import store from './redux/store';
import { newMessage } from './redux/features/messages';
import {
  newChannel,
  removeChannel,
  renameChannel,
} from './redux/features/channels';
import resources from './locales';
import {
  ClientToServerEvents,
  ServerToClientEvents,
  ClientToServerEventData,
  ApiWithAcks,
} from './types';
import App from './App';

const TIMEOUT = 3000;

export default async (
  socket: Socket<ServerToClientEvents, ClientToServerEvents>,
) => {
  const socketEvents: (keyof ClientToServerEventData)[] = [
    'newMessage',
    'newChannel',
    'renameChannel',
    'removeChannel',
  ];

  const api = socketEvents.reduce(
    (acc, eventName) => ({
      ...acc,
      [eventName]: (data: ClientToServerEventData[typeof eventName]) =>
        socket.volatile.timeout(TIMEOUT).emitWithAck(eventName, data),
    }),
    {} as ApiWithAcks,
  );

  socket
    .on('newMessage', (payload) => {
      store.dispatch(newMessage(payload));
    })
    .on('newChannel', (payload) => {
      store.dispatch(newChannel(payload));
    })
    .on('removeChannel', (payload) => {
      store.dispatch(removeChannel(payload));
    })
    .on('renameChannel', (payload) => {
      store.dispatch(renameChannel(payload));
    });

  const i18n = createInstance();

  await i18n
    .use(initReactI18next)
    .use(LanguageDetector)
    .init({
      fallbackLng: 'en',
      debug: false,
      interpolation: {
        escapeValue: false,
      },
      resources,
    });

  const rollbarConfig = {
    accessToken: process.env.REACT_APP_ROLLBAR_POST_CLIENT_ITEM_ACCESS_TOKEN,
    captureUncaught: true,
    captureUnhandledRejections: true,
    enabled: process.env.NODE_ENV === 'production',
  };

  return (
    <RollbarProvider config={rollbarConfig}>
      <ErrorBoundary>
        <I18nextProvider i18n={i18n}>
          <Provider store={store}>
            <ApiContext.Provider value={api}>
              <ProfanityFilterProvider>
                <App />
              </ProfanityFilterProvider>
            </ApiContext.Provider>
          </Provider>
        </I18nextProvider>
      </ErrorBoundary>
    </RollbarProvider>
  );
};
