import React, { useContext } from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from 'react-bootstrap';
import AuthContext from '../contexts/AuthContext.js';

const LogOutButton = () => {
  const auth = useContext(AuthContext);
  const { t } = useTranslation();
  return auth.loggedIn ? (<Button onClick={auth.logOut}>{t('main.button.logout')}</Button>) : null;
};

export default LogOutButton;
