import React, { useState, useContext, useMemo } from 'react';
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
import LoginPage from '../features/LoginPage.jsx';
import SignUpPage from '../features/SignUpPage.jsx';
import ChatPage from '../features/ChatPage.jsx';
import LogOutButton from '../features/LogOutButton.jsx';
import AuthContext from '../contexts/AuthContext.js';
import SocketContext from '../contexts/SocketContext.js';
import { addMessage } from '../features/messages/messagesSlice.js';
import { addChannel, removeChannel, renameChannel } from '../features/channels/channelsSlice.js';

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

const ChatRoute = () => {
  const auth = useContext(AuthContext);

  return (
    <Route
      render={({ location }) => (auth.loggedIn ? (
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
  const auth = useContext(AuthContext);

  return (
    <Route
      render={({ location }) => (auth.loggedIn ? (
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
  const auth = useContext(AuthContext);

  return (
    <Route
      render={({ location }) => (auth.loggedIn ? (
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
  const socket = useContext(SocketContext);
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
    <AuthProvider>
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

      </Router>
    </AuthProvider>
  );
};
export default App;
