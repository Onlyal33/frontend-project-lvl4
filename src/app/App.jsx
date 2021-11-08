import React, { useState, useContext } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  useLocation,
  Redirect,
} from 'react-router-dom';
import LoginPage from '../features/LoginPage.jsx';
import ChatPage from '../features/ChatPage.jsx';
import AuthContext from '../common/AuthContext.js';

const AuthProvider = ({ children }) => {
  const [loggedIn, setLoggedIn] = useState(!!localStorage.getItem('userId'));

  const logIn = (userId) => {
    localStorage.setItem('userId', userId);
    setLoggedIn(true);
  };

  const logOut = () => {
    localStorage.removeItem('userId');
    setLoggedIn(false);
  };

  return (
    <AuthContext.Provider value={{ loggedIn, logIn, logOut }}>
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

const App = () => (
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

export default App;
