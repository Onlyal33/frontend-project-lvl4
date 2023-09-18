import axios from 'axios';
import React, {
  useEffect, useRef, useState,
} from 'react';
import { useFormik } from 'formik';
import {
  Button, Form, Card, Image,
} from 'react-bootstrap';
import { useLocation, useHistory } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import routes from '../common/routes.js';
import { useAuth } from '../contexts/AuthContext.jsx';
import getValidationSchema from '../common/validation.js';

const SignUpPage = () => {
  const { logIn } = useAuth();
  const [authFailed, setAuthFailed] = useState(false);
  const inputRef = useRef(null);
  const location = useLocation();
  const history = useHistory();
  const { t } = useTranslation();
  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  useEffect(() => {
    if (authFailed) {
      setAuthFailed(false);
    }
  }, [inputRef.current?.value]);

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
      passwordConfirmation: '',
    },
    validationSchema: getValidationSchema('signup')(),
    errors: {},
    onSubmit: async (values, actions) => {
      setAuthFailed(false);

      try {
        const res = await axios.post(routes.signupPath(), values);
        logIn(res.data);
        const { from } = location.state || { from: { pathname: '/' } };
        history.replace(from);
      } catch (err) {
        if (err.isAxiosError && err.response.status === 409) {
          setAuthFailed(true);
          actions.setFieldError('username', t('signup.errors.userExists'));
          inputRef.current.select();
          return;
        }
        throw err;
      }
    },
  });

  return (
    <div className="container-fluid h-100">
      <div className="row justify-content-center align-content-center h-100">
        <div className="col-12 col-md-8 col-xxl-6">
          <Card className="shadow-sm">
            <Card.Body className="row p-5">
              <div className="col-12 col-md-6 d-flex align-items-center justify-content-center">
                <Image src="https://i.ibb.co/x1C4Mnm/register.jpg" roundedCircle alt={t('signup.header')} />
              </div>
              <Form onSubmit={formik.handleSubmit} className="col-12 col-md-6 mt-3 mt-mb-0">
                <Card.Title className="text-center mb-4" as="h1">{t('signup.header')}</Card.Title>
                <Form.Group className="form-floating mb-3">
                  <Form.Control
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.username}
                    placeholder="Username"
                    name="username"
                    id="username"
                    autoComplete="username"
                    isInvalid={(!!formik.errors.username && formik.touched.username) || authFailed}
                    ref={inputRef}
                  />
                  <Form.Control.Feedback type="invalid">
                    {formik.errors.username}
                  </Form.Control.Feedback>
                  <Form.Label htmlFor="username">{t('tooltip.username')}</Form.Label>
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
                    autoComplete="current-password"
                    isInvalid={(!!formik.errors.password && formik.touched.password) || authFailed}
                  />
                  <Form.Control.Feedback type="invalid">
                    {formik.errors.password}
                  </Form.Control.Feedback>
                  <Form.Label htmlFor="password">{t('tooltip.password')}</Form.Label>
                </Form.Group>
                <Form.Group className="form-floating mb-3">
                  <Form.Control
                    type="password"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.confirmPassword}
                    placeholder="Confirm Password"
                    name="passwordConfirmation"
                    id="passwordConfirmation"
                    autoComplete="current-password"
                    isInvalid={(!!formik.errors.passwordConfirmation
                      && formik.touched.passwordConfirmation)
                      || authFailed}
                  />
                  <Form.Control.Feedback type="invalid">
                    {formik.errors.passwordConfirmation}
                  </Form.Control.Feedback>
                  <Form.Label htmlFor="passwordConfirmation">{t('tooltip.confirmPassword')}</Form.Label>
                </Form.Group>
                <Button type="submit" className="w-100" variant="outline-primary">{t('signup.button')}</Button>
              </Form>
            </Card.Body>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;
