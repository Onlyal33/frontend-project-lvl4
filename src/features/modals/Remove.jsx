import React, {
  useState, useRef, useEffect, useContext,
} from 'react';
import { Form, Modal, Button } from 'react-bootstrap';
import SocketContext from '../../contexts/SocketContext.js';

const generateOnSubmit = ({
  setError, setIsSubmitting, onHide, item, socket,
}) => (event, actions) => {
  event.preventDefault();
  setError(null);
  setIsSubmitting(true);

  if (socket.connected) {
    socket.emit('removeChannel',
      item,
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
    actions.setFieldError('message', 'No network');
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

  useEffect(() => {
    modalRef.current.focus();
  }, []);

  return (
    <Modal show onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>Remove Channel</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div>
          Do you really want to remove channel
          {' '}
          {name}
          ?
        </div>
        <Form.Text className="text-danger">
          {error}
        </Form.Text>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Cancel
        </Button>
        <Form
          onSubmit={generateOnSubmit({
            setError, setIsSubmitting, onHide, item, socket,
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
            Submit
          </Form.Control>
        </Form>
      </Modal.Footer>
    </Modal>
  );
};

export default Remove;
