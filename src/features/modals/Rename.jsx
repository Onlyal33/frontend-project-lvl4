import React, { useRef, useEffect, useContext } from 'react';
import { useSelector } from 'react-redux';
import {
  Modal, Button, FormControl, InputGroup,
} from 'react-bootstrap';
import { Formik, Form } from 'formik';
import { useTranslation } from 'react-i18next';
import getValidationSchema from '../../common/validation.js';
import SocketContext from '../../contexts/SocketContext.js';

const generateOnSubmit = ({
  onHide, item, socket, t,
}) => ({ name }, actions) => {
  if (socket.connected) {
    socket.emit('renameChannel',
      { ...item, name: name.trim() },
      (res) => {
        if (res.status === 'ok') {
          onHide();
        } else {
          actions.setSubmitting(false);
          actions.setFieldError('message', res.status);
        }
      });
  } else {
    actions.setSubmitting(false);
    actions.setFieldError('message', t('modal.errors.noNetwork'));
  }
};

const getFiletredChannelNames = (idToRename) => (state) => state.channelsInfo.channels
  .filter(({ id }) => id !== idToRename)
  .map(({ name }) => name);

const Rename = ({ onHide, modalInfo: { item } }) => {
  const modalRef = useRef();
  const socket = useContext(SocketContext);
  const { t } = useTranslation();

  useEffect(() => {
    modalRef.current.select();
  }, []);

  const filteredChannelNames = useSelector(getFiletredChannelNames(item.id));

  return (
    <Modal show onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>{t('modal.header.rename')}</Modal.Title>
      </Modal.Header>
      <Formik
        initialValues={{
          name: item.name,
        }}
        validationSchema={getValidationSchema('channel')(filteredChannelNames)}
        onSubmit={generateOnSubmit({
          onHide, item, socket, t,
        })}
      >
        {({
          handleChange,
          values,
          isSubmitting,
          errors,
        }) => (
          <Form>
            <Modal.Body as={InputGroup}>
              <FormControl
                ref={modalRef}
                type="text"
                id="name"
                name="name"
                aria-label="name"
                required
                onChange={handleChange}
                value={values.name}
                isInvalid={!!errors.name}
                disabled={isSubmitting}
              />
              <FormControl.Feedback type="invalid">
                {errors.name}
              </FormControl.Feedback>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={onHide}>{t('modal.button.cancel')}</Button>
              <Button variant="primary" type="submit" disabled={isSubmitting}>{t('modal.button.submit')}</Button>
            </Modal.Footer>
          </Form>
        )}
      </Formik>
    </Modal>
  );
};

export default Rename;
