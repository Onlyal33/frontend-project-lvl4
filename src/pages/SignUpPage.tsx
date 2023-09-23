import axios from 'axios';
import { useEffect, useRef, useState } from 'react';
import { useFormik } from 'formik';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card';
import Image from 'react-bootstrap/Image';
import { useLocation, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useRollbar } from '@rollbar/react';
import { toast } from 'react-toastify';
import routes from '../common/routes';
import { useLogIn } from '../contexts/AuthContext';
import validationSchema from '../common/validation';

const SignUpPage = () => {
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
      passwordConfirmation: '',
    },
    validationSchema: validationSchema.signup,
    onSubmit: async (values) => {
      authFailed && setAuthFailed(false);

      axios
        .post(routes.signupPath(), values)
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
            if (err.response?.status === 409) {
              setAuthFailed(true);
              inputRef.current?.select();
            } else {
              rollbar.error('Axios error while signing up', err, {
                username: values.username,
              });
              toast.error(t('errors.network'));
            }
          } else {
            toast.error(t('errors.unknown'));
            rollbar.error('Unknown error while signing up', err, {
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
                  src="https://i.ibb.co/x1C4Mnm/register.jpg"
                  roundedCircle
                  alt={t('signup.header')}
                />
              </div>
              <Form
                onSubmit={formik.handleSubmit}
                className="col-12 col-md-6 mt-3 mt-mb-0"
              >
                <Card.Title className="text-center mb-4" as="h1">
                  {t('signup.header')}
                </Card.Title>
                <Form.Group className="form-floating mb-3">
                  <Form.Control
                    onChange={(e) => {
                      authFailed && setAuthFailed(false);
                      formik.handleChange(e);
                    }}
                    onBlur={formik.handleBlur}
                    value={formik.values.username}
                    placeholder="Username"
                    name="username"
                    id="username"
                    autoComplete="username"
                    isInvalid={
                      (formik.errors.username && formik.touched.username) ||
                      authFailed
                    }
                    ref={inputRef}
                  />
                  <Form.Control.Feedback type="invalid">
                    {formik.errors.username && t(formik.errors.username)}
                  </Form.Control.Feedback>
                  <Form.Label htmlFor="username">
                    {t('tooltip.username')}
                  </Form.Label>
                </Form.Group>
                <Form.Group className="form-floating mb-3">
                  <Form.Control
                    type="password"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.password}
                    placeholder="Password"
                    name="password"
                    id="password"
                    autoComplete="new-password"
                    isInvalid={
                      (formik.errors.password && formik.touched.password) ||
                      authFailed
                    }
                  />
                  <Form.Control.Feedback type="invalid">
                    {formik.errors.password && t(formik.errors.password)}
                  </Form.Control.Feedback>
                  <Form.Label htmlFor="password">
                    {t('tooltip.password')}
                  </Form.Label>
                </Form.Group>
                <Form.Group className="form-floating mb-3">
                  <Form.Control
                    type="password"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.passwordConfirmation}
                    placeholder="Confirm Password"
                    name="passwordConfirmation"
                    id="passwordConfirmation"
                    autoComplete="new-password"
                    isInvalid={
                      (formik.errors.passwordConfirmation &&
                        formik.touched.passwordConfirmation) ||
                      authFailed
                    }
                  />
                  <Form.Control.Feedback type="invalid">
                    {authFailed
                      ? t('errors.userExists')
                      : formik.errors.passwordConfirmation &&
                        t(formik.errors.passwordConfirmation)}
                  </Form.Control.Feedback>
                  <Form.Label htmlFor="passwordConfirmation">
                    {t('tooltip.confirmPassword')}
                  </Form.Label>
                </Form.Group>
                <Button
                  type="submit"
                  className="w-100"
                  variant="outline-primary"
                >
                  {t('signup.button')}
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;
