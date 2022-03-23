import React, {
  useState, useRef, useEffect, useContext,
} from 'react';
import { Form, Modal, Button } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import SocketContext from '../../contexts/SocketContext.js';

const generateOnSubmit = ({
  setError, setIsSubmitting, onHide, item, socket, t,
}) => (event, actions) => {
  event.preventDefault();
  setError(null);
  setIsSubmitting(true);

  if (socket.connected) {
    socket.emit(
      'removeChannel',
      item,
      (res) => {
        if (res.status === 'ok') {
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
/*
  const path = routes.channelPath(item.id);

  try {
    await axios.delete(path);
    onHide();
  } catch (e) {
    setIsSubmitting(false);
    setError(e.message);
  } */
};

const Remove = ({ onHide, modalInfo: { item } }) => {
  const { name } = item;

  const modalRef = useRef();

  const [error, setError] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const socket = useContext(SocketContext);
  const { t } = useTranslation();

  useEffect(() => {
    modalRef.current.focus();
  }, []);

  return (
    <Modal show onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>{t('modal.header.remove')}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div>
          {t('modal.removeText1')}
          {name}
          {t('modal.removeText2')}
        </div>
        <Form.Text className="text-danger">
          {error}
        </Form.Text>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>{t('modal.button.cancel')}</Button>
        <Form
          onSubmit={generateOnSubmit({
            setError, setIsSubmitting, onHide, item, socket, t,
          })}
        >
          <Form.Control
            as={Button}
            variant={!error ? 'danger' : 'outline-danger'}
            type="submit"
            isInvalid={!!error}
            disabled={isSubmitting}
            ref={modalRef}
          >
            {t('modal.button.submit')}
          </Form.Control>
        </Form>
      </Modal.Footer>
    </Modal>
  );
};

export default Remove;
