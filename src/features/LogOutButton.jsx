import React, { useContext } from 'react';
import { Button } from 'react-bootstrap';
import AuthContext from '../contexts/AuthContext.js';

const LogOutButton = () => {
  const auth = useContext(AuthContext);
  return auth.loggedIn ? (<Button onClick={auth.logOut}>Log Out</Button>) : null;
};

export default LogOutButton;
