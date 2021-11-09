import React, { useContext, useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { Formik, Form } from 'formik';
import {
  Button, FormControl, InputGroup,
} from 'react-bootstrap';
import AuthContext from '../../contexts/AuthContext.js';
import SocketContext from '../../contexts/SocketContext.js';
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

  const username = useContext(AuthContext).getUsername();
  const socket = useContext(SocketContext);
  const handleSubmit = ({ message }, actions) => {
    if (socket.connected) {
      socket.emit('newMessage',
        {
          body: message.trim(),
          username,
          channelId: currentChannelId,
        },
        (res) => {
          if (res.status === 'ok') {
            actions.resetForm();
            inputRef.current.focus();
          }
          actions.setSubmitting(false);
        });
    } else {
      actions.setSubmitting(false);
      actions.setFieldError('message', 'No network');
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
        <Form className="py-1 border rounded-2">
          <InputGroup>
            <FormControl
              className="border-0 p-0 ps-2"
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
            <Button type="submit" variant="link" className="rounded-0 text-secondary" disabled={isSubmitting || values.message === ''}>
              Send
            </Button>
            <FormControl.Feedback type="invalid">
              {errors.message}
            </FormControl.Feedback>
          </InputGroup>
        </Form>
      )}
    </Formik>
  );
};

export default MessageForm;
