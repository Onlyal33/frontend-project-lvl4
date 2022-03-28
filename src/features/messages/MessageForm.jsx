import React, { useContext, useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { Formik, Form } from 'formik';
import { useTranslation } from 'react-i18next';
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

  const { t } = useTranslation();

  useEffect(() => {
    if (!isModalOpen) {
      inputRef.current.focus();
    }
  }, [currentChannelId, isModalOpen]);

  const username = useContext(AuthContext).getUsername();
  const socket = useContext(SocketContext);
  const handleSubmit = ({ message }, actions) => {
    if (socket.connected) {
      socket.emit(
        'newMessage',
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
        },
      );
    } else {
      actions.setSubmitting(false);
      actions.setFieldError('message', t('messages.errors.noNetwork'));
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
              aria-label="New message"
              onChange={handleChange}
              placeholder={t('tooltip.message')}
              value={values.message}
              isInvalid={!!errors.message}
              disabled={isSubmitting}
              ref={inputRef}
            />
            <Button type="submit" variant="link" disabled={isSubmitting || values.message === ''}>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" width="20" height="20" fill="currentColor">
                <path fillRule="evenodd" d="M15 2a1 1 0 0 0-1-1H2a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V2zM0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2zm4.5 5.5a.5.5 0 0 0 0 1h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5H4.5z" />
              </svg>
              <span className="visually-hidden">{t('main.button.send')}</span>
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
