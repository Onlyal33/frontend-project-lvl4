import axios from 'axios';
import { useEffect, useRef, useState } from 'react';
import { useFormik } from 'formik';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card';
import Image from 'react-bootstrap/Image';
import { useLocation, Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useRollbar } from '@rollbar/react';
import { toast } from 'react-toastify';
import routes from '../common/routes';
import { useLogIn } from '../contexts/AuthContext';

const LoginPage = () => {
  const logIn = useLogIn();
  const [authFailed, setAuthFailed] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const location = useLocation();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const rollbar = useRollbar();

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    onSubmit: async (values) => {
      authFailed && setAuthFailed(false);

      axios
        .post(routes.loginPath(), values)
        .then(({ data }) => {
          logIn(data);
          const { from } = location.state || {
            from: { pathname: routes.chatPagePath() },
          };
          navigate(from);
        })
        .catch((err) => {
          formik.setSubmitting(false);

          if (axios.isAxiosError(err)) {
            if (err.response?.status === 401) {
              setAuthFailed(true);
              inputRef.current?.select();
            } else {
              rollbar.error('Axios error while logging in', err, {
                username: values.username,
              });
              toast.error(t('errors.network'));
            }
          } else {
            toast.error(t('errors.unknown'));
            rollbar.error('Unknown error while logging in', err, {
              username: values.username,
            });
          }
        });
    },
  });

  return (
    <div className="container-fluid h-100">
      <div className="row justify-content-center align-content-center h-100">
        <div className="col-12 col-md-8 col-xxl-6">
          <Card className="shadow-sm">
            <Card.Body className="row p-5">
              <div className="col-12 col-md-6 d-flex align-items-center justify-content-center">
                <Image
                  src="https://i.ibb.co/p2GcspM/login.jpg"
                  roundedCircle
                  alt={t('login.header')}
                />
              </div>
              <Form
                onSubmit={formik.handleSubmit}
                className="col-12 col-md-6 mt-3 mt-mb-0"
              >
                <Card.Title className="text-center mb-4" as="h1">
                  {t('login.header')}
                </Card.Title>
                <Form.Group className="form-floating mb-3">
                  <Form.Control
                    onChange={(e) => {
                      authFailed && setAuthFailed(false);
                      formik.handleChange(e);
                    }}
                    value={formik.values.username}
                    placeholder="username"
                    name="username"
                    id="username"
                    autoComplete="username"
                    isInvalid={authFailed}
                    required
                    ref={inputRef}
                  />
                  <Form.Label htmlFor="username">
                    {t('tooltip.nickname')}
                  </Form.Label>
                </Form.Group>
                <Form.Group className="form-floating mb-3">
                  <Form.Control
                    type="password"
                    onChange={(e) => {
                      authFailed && setAuthFailed(false);
                      formik.handleChange(e);
                    }}
                    value={formik.values.password}
                    placeholder="password"
                    name="password"
                    id="password"
                    autoComplete="current-password"
                    isInvalid={authFailed}
                    required
                  />
                  <Form.Control.Feedback type="invalid">
                    {t('errors.incorrectCredentials')}
                  </Form.Control.Feedback>
                  <Form.Label htmlFor="password">
                    {t('tooltip.password')}
                  </Form.Label>
                </Form.Group>
                <Button
                  type="submit"
                  className="w-100"
                  variant="outline-primary"
                >
                  {t('login.button')}
                </Button>
              </Form>
            </Card.Body>
            <Card.Footer className="text-muted text-center p-4">
              <span>{t('login.redirectText')}</span>
              <Link to={routes.signupPagePath()}>
                {t('login.redirectLink')}
              </Link>
            </Card.Footer>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
