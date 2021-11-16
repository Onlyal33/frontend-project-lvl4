import axios from 'axios';
import React, {
  useEffect, useRef, useState, useContext,
} from 'react';
import { useFormik } from 'formik';
import { Button, Form, Card } from 'react-bootstrap';
import { useLocation, useHistory } from 'react-router-dom';
import routes from '../common/routes.js';
import AuthContext from '../contexts/AuthContext.js';
import getValidationSchema from '../common/validation.js';

const SignUpPage = () => {
  const auth = useContext(AuthContext);
  const [authFailed, setAuthFailed] = useState(false);
  const inputRef = useRef(null);
  const location = useLocation();
  const history = useHistory();
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
        auth.logIn(res.data);
        const { from } = location.state || { from: { pathname: '/' } };
        history.replace(from);
      } catch (err) {
        if (err.isAxiosError && err.response.status === 409) {
          setAuthFailed(true);
          actions.setFieldError('username', 'User already exists');
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
            <Card.Body className="d-flex flex-column flex-md-row justify-content-around align-items-center p-5">
              <Form onSubmit={formik.handleSubmit} className="p-3">
                <Card.Title className="text-center mb-4" as="h1">Registration</Card.Title>
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
                  <Form.Label htmlFor="username">Username</Form.Label>
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
                  <Form.Label htmlFor="password">Password</Form.Label>
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
                  <Form.Label htmlFor="passwordConfirmation">Confirm Password</Form.Label>
                </Form.Group>
                <Button type="submit" className="w-100" variant="outline-primary">Sign Up</Button>
              </Form>
            </Card.Body>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;
