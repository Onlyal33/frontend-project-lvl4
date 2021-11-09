import React, { useState, useContext } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  useLocation,
  Redirect,
} from 'react-router-dom';
import { useDispatch } from 'react-redux';
import LoginPage from '../features/LoginPage.jsx';
import ChatPage from '../features/ChatPage.jsx';
import AuthContext from '../contexts/AuthContext.js';
import SocketContext from '../contexts/SocketContext.js';
import { addMessage } from '../features/messages/messagesSlice.js';
import {
  addChannel, removeChannel, renameChannel,
} from '../features/channels/channelsSlice.js';

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

  return (
    <AuthContext.Provider value={{
      loggedIn, logIn, logOut, getUsername, getUserId,
    }}
    >
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
        <Switch>
          <Route exact path="/">
            <ChatRoute />
          </Route>
          <Route path="/login">
            <LoginRoute />
          </Route>
          <Route path="*">
            <NoMatch />
          </Route>
        </Switch>
      </Router>
    </AuthProvider>
  );
};
export default App;
