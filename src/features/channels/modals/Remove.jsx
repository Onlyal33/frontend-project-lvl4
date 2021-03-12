import React, { useState } from 'react';
import { Form, Modal, Button } from 'react-bootstrap';
import axios from 'axios';
import routes from '../../../common/routes.js';

const generateOnSubmit = ({
  setError, setIsSubmitting, onHide, item,
}) => async (event) => {
  event.preventDefault();
  const path = routes.channelPath(item.id);
  setError(null);
  setIsSubmitting(true);
  try {
    await axios.delete(path);
    setIsSubmitting(false);
    onHide();
  } catch (e) {
    setIsSubmitting(false);
    setError(e.message);
  }
};

const Remove = ({ onHide, modalInfo: { item } }) => {
  const { name } = item;
  const [error, setError] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

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
          inline
          onSubmit={generateOnSubmit({
            setError, setIsSubmitting, onHide, item,
          })}
        >
          <Form.Control
            as={Button}
            variant={!error ? 'danger' : 'outline-danger'}
            type="submit"
            isInvalid={!!error}
            disabled={isSubmitting}
          >
            Submit
          </Form.Control>
        </Form>
      </Modal.Footer>
    </Modal>
  );
};

export default Remove;
