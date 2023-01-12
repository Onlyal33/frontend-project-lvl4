import React, { useContext } from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from 'react-bootstrap';
import AuthContext from '../contexts/AuthContext.js';

const LogOutButton = () => {
  const { loggedIn, logOut } = useContext(AuthContext);
  const { t } = useTranslation();
  return loggedIn ? (<Button onClick={logOut}>{t('main.button.logout')}</Button>) : null;
};

export default LogOutButton;
