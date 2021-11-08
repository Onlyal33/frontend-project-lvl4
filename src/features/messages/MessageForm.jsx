import React, { useContext, useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { Formik, Form } from 'formik';
import {
  Button, Col, Row, FormControl, InputGroup,
} from 'react-bootstrap';
import axios from 'axios';
import routes from '../../common/routes.js';
import AuthContext from '../../common/AuthContext.js';
import getValidationSchema from '../../common/validation.js';

const MessageForm = () => {
  const currentChannelId = useSelector((state) => state.channelsInfo.currentChannelId);
  const isModalOpen = useSelector((state) => state.modalInfo.isOpen);
  const inputRef = useRef();

  useEffect(() => {
    if (!isModalOpen) {
      inputRef.current.focus();
    }
  }, [currentChannelId, isModalOpen]);

  const nickname = useContext(AuthContext);
  // TODO rework nickname-related issues

  const handleSubmit = async ({ message }, actions) => {
    const path = routes.channelMessagesPath(currentChannelId);
    try {
      await axios.post(path, { data: { attributes: { message: message.trim(), nickname } } });
      actions.resetForm();
    } catch (e) {
      actions.setFieldError('message', e.message);
    } finally {
      actions.setSubmitting(false);
      inputRef.current.focus();
    }
  };

  return (
    <Formik
      initialValues={{
        message: '',
      }}
      onSubmit={handleSubmit}
      validationSchema={getValidationSchema('message')()}
    >
      {({
        handleChange,
        values,
        isSubmitting,
        errors,
      }) => (
        <Form>
          <Row>
            <Col>
              <InputGroup>
                <FormControl
                  type="text"
                  id="message"
                  name="message"
                  aria-label="new message"
                  onChange={handleChange}
                  placeholder="Write your message here"
                  value={values.message}
                  isInvalid={!!errors.message}
                  disabled={isSubmitting}
                  ref={inputRef}
                />
                <FormControl.Feedback type="invalid">
                  {errors.message}
                </FormControl.Feedback>
              </InputGroup>
            </Col>
            <Col xs="auto">
              <Button type="submit" disabled={isSubmitting}>
                Send
              </Button>
            </Col>
          </Row>
        </Form>
      )}
    </Formik>
  );
};

export default MessageForm;
