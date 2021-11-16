import axios from 'axios';
import React, {
  useEffect, useRef, useState, useContext,
} from 'react';
import { useFormik } from 'formik';
import { Button, Form, Card } from 'react-bootstrap';
import { useLocation, useHistory, Link } from 'react-router-dom';
import routes from '../common/routes.js';
import AuthContext from '../contexts/AuthContext.js';

const LoginPage = () => {
  const auth = useContext(AuthContext);
  const [authFailed, setAuthFailed] = useState(false);
  const inputRef = useRef(null);
  const location = useLocation();
  const history = useHistory();
  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    onSubmit: async (values) => {
      setAuthFailed(false);

      try {
        const res = await axios.post(routes.loginPath(), values);
        auth.logIn(res.data);
        const { from } = location.state || { from: { pathname: '/' } };
        history.replace(from);
      } catch (err) {
        if (err.isAxiosError && err.response.status === 401) {
          setAuthFailed(true);
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
                <Card.Title className="text-center mb-4" as="h1">Log in</Card.Title>
                <Form.Group className="form-floating mb-3">
                  <Form.Control
                    onChange={formik.handleChange}
                    value={formik.values.username}
                    placeholder="username"
                    name="username"
                    id="username"
                    autoComplete="username"
                    isInvalid={authFailed}
                    required
                    ref={inputRef}
                  />
                  <Form.Label htmlFor="username">Username</Form.Label>
                </Form.Group>
                <Form.Group className="form-floating mb-3">
                  <Form.Control
                    type="password"
                    onChange={formik.handleChange}
                    value={formik.values.password}
                    placeholder="password"
                    name="password"
                    id="password"
                    autoComplete="current-password"
                    isInvalid={authFailed}
                    required
                  />
                  <Form.Control.Feedback type="invalid">the username or password is incorrect</Form.Control.Feedback>
                  <Form.Label htmlFor="password">Password</Form.Label>
                </Form.Group>
                <Button type="submit" className="w-100" variant="outline-primary">Log In</Button>
              </Form>
            </Card.Body>
            <Card.Footer className="text-muted text-center p-4">
              <span>Do not have an account? </span>
              <Link to="/signup">Sign up</Link>
            </Card.Footer>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
