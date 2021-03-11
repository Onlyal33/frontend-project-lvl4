import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Form, Modal, Button } from 'react-bootstrap';
import { deleteChannelThunk } from '../../features/channelsSlice';

const Remove = ({ onHide, modalInfo: { item } }) => {
  const { name, id } = item;
  const [error, setError] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const dispatch = useDispatch();
  const handleSubmit = (e) => {
    e.preventDefault();
    setError(null);
    setIsSubmitting(true);
    dispatch(deleteChannelThunk({ id }))
      .then((action) => {
        setIsSubmitting(false);
        if (action.type.includes('fulfilled')) {
          onHide();
        } else {
          setError(action.payload);
        }
      });
  };

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
        <Form inline onSubmit={handleSubmit}>
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
