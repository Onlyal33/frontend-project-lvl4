import { useTranslation } from 'react-i18next';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from 'react-router-dom';
import { useUser, useLogOut } from '../../contexts/AuthContext';
import routes from '../../common/routes';

export default function NavBar() {
  const user = useUser();
  const logOut = useLogOut();
  const { t } = useTranslation();

  return (
    <Navbar bg="light" expand="lg" className="shadow-sm">
      <Container>
        <Navbar.Brand as={Link} to={routes.chatPagePath()}>
          {t('appHeader')}
        </Navbar.Brand>
        {user && <Button onClick={logOut}>{t('main.button.logout')}</Button>}
      </Container>
    </Navbar>
  );
}
