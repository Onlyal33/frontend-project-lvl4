import React, { useContext, useEffect, useRef } from 'react';
import { useSelector, shallowEqual } from 'react-redux';
import { Formik, Form } from 'formik';
import {
  Button, Col, Row, FormControl, InputGroup,
} from 'react-bootstrap';
import axios from 'axios';
import routes from '../../common/routes.js';
import NicknameContext from '../../common/nickname.js';

const validate = (values) => {
  const errors = {};

  if (values.message.trim().length === 0) {
    errors.message = 'Please enter some text here';
  }

  return errors;
};

const MessageForm = () => {
  const currentChannelId = useSelector((state) => state.channelsInfo.currentChannelId);
  const channels = useSelector((state) => state.channelsInfo.channels
    .map(({ name }) => name), shallowEqual);
  const inputRef = useRef();

  useEffect(() => {
    inputRef.current.focus();
  }, [channels, currentChannelId]);

  const nickname = useContext(NicknameContext);

  const handleSubmit = async ({ message }, actions) => {
    const path = routes.channelMessagesPath(currentChannelId);
    try {
      await axios.post(path, { data: { attributes: { message, nickname } } });
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
      validate={validate}
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
