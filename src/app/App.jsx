/* eslint-disable react/destructuring-assignment */
import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useLocation,
  Redirect,
} from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { Navbar, Container } from 'react-bootstrap';
import { ToastContainer } from 'react-toastify';
import LoginPage from '../features/LoginPage.jsx';
import SignUpPage from '../features/SignUpPage.jsx';
import ChatPage from '../features/ChatPage.jsx';
import LogOutButton from '../features/LogOutButton.jsx';
import { useAuth } from '../contexts/AuthContext.jsx';
import { useSocket } from '../contexts/SocketContext.jsx';
import { addMessage } from '../features/messages/messagesSlice.js';
import { addChannel, removeChannel, renameChannel } from '../features/channels/channelsSlice.js';

const ChatRoute = () => {
  const { loggedIn } = useAuth();

  return (
    <Route
      render={({ location }) => (loggedIn ? (
        <ChatPage />
      ) : (
        <Redirect
          to={{
            pathname: '/login',
            state: { from: location },
          }}
        />
      ))}
    />
  );
};

const LoginRoute = () => {
  const { loggedIn } = useAuth();

  return (
    <Route
      render={({ location }) => (loggedIn ? (
        <Redirect
          to={{
            pathname: '/',
            state: { from: location },
          }}
        />
      ) : (
        <LoginPage />
      ))}
    />
  );
};

const SignUpRoute = () => {
  const { loggedIn } = useAuth();

  return (
    <Route
      render={({ location }) => (loggedIn ? (
        <Redirect
          to={{
            pathname: '/',
            state: { from: location },
          }}
        />
      ) : (
        <SignUpPage />
      ))}
    />
  );
};

const NoMatch = () => {
  const location = useLocation();

  return (
    <div>
      <h3>
        404
        {' '}
        <code>{location.pathname}</code>
        {' '}
        not found
      </h3>
    </div>
  );
};

const App = () => {
  const socket = useSocket();
  const dispatch = useDispatch();
  const { t } = useTranslation();

  socket.on('newMessage', (payload) => {
    dispatch(addMessage(payload));
  });

  socket.on('newChannel', (payload) => {
    dispatch(addChannel(payload));
  });

  socket.on('removeChannel', (payload) => {
    dispatch(removeChannel(payload));
  });

  socket.on('renameChannel', (payload) => {
    dispatch(renameChannel(payload));
  });

  return (
    <Router>
      <div className="h-100">
        <div className="d-flex flex-column h-100">
          <Navbar bg="light" expand="lg" className="shadow-sm">
            <Container>
              <Navbar.Brand as={Link} to="/">{t('appHeader')}</Navbar.Brand>
              <LogOutButton />
            </Container>
          </Navbar>
          <Switch>
            <Route exact path="/">
              <ChatRoute />
            </Route>
            <Route path="/login">
              <LoginRoute />
            </Route>
            <Route path="/signup">
              <SignUpRoute />
            </Route>
            <Route path="*">
              <NoMatch />
            </Route>
          </Switch>
        </div>
      </div>
      <ToastContainer />
    </Router>
  );
};
export default App;
