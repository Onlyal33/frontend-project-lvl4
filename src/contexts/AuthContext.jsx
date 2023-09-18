import {
  createContext, useContext, useMemo, useState,
} from 'react';

const AuthContext = createContext();

export const useAuth = useContext(AuthContext);

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
    loggedIn,
    logIn,
    logOut,
    getUsername,
    getUserId,
  }));

  return (
    // eslint-disable-next-line react/react-in-jsx-scope
    <AuthContext.Provider value={authData}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
