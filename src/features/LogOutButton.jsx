import { useTranslation } from 'react-i18next';
import Button from 'react-bootstrap/Button';
import { useAuth } from '../contexts/AuthContext.jsx';

const LogOutButton = () => {
  const { loggedIn, logOut } = useAuth();
  const { t } = useTranslation();
  return loggedIn ? (
    <Button onClick={logOut}>{t('main.button.logout')}</Button>
  ) : null;
};

export default LogOutButton;
