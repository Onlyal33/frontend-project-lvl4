import { Form, Formik } from 'formik';
import React, { useEffect, useRef, useContext } from 'react';
import {
  Button, FormControl, InputGroup, Modal,
} from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import getValidationSchema from '../../common/validation.js';
import { changeCurrentChannel } from '../channels/channelsSlice.js';
import SocketContext from '../../contexts/SocketContext.js';

const generateOnSubmit = ({
  onHide, dispatch, socket, t,
}) => ({ name }, actions) => {
  if (socket.connected) {
    socket.emit(
      'newChannel',
      {
        name: name.trim(),
      },
      (res) => {
        if (res.status === 'ok') {
          dispatch(changeCurrentChannel(res.data));
          toast.success(t('toast.channel.add'));
          onHide();
        } else {
          actions.setSubmitting(false);
          actions.setFieldError('message', res.status);
        }
      },
    );
  } else {
    actions.setSubmitting(false);
    actions.setFieldError('message', t('modal.errors.noNetwork'));
  }
};

const getChannelNames = (state) => state.channelsInfo.channels.map(({ name }) => name);

const Add = ({ onHide }) => {
  const modalRef = useRef();
  const channelNames = useSelector(getChannelNames);
  const socket = useContext(SocketContext);
  const { t } = useTranslation();

  useEffect(() => {
    modalRef.current.focus();
  }, []);
  const dispatch = useDispatch();

  return (
    <Modal show onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>{t('modal.header.add')}</Modal.Title>
      </Modal.Header>
      <Formik
        initialValues={{
          name: '',
        }}
        validationSchema={getValidationSchema('channel')(channelNames)}
        onSubmit={generateOnSubmit({
          onHide, dispatch, socket, t,
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
                required
                aria-label="name"
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

export default Add;
