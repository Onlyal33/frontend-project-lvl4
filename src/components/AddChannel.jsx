import React, { useState, useRef, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import {
  Modal, Button, FormControl, InputGroup,
} from 'react-bootstrap';
import { Formik, Form } from 'formik';

import { newChannelThunk } from '../features/channelsSlice';

const AddChannel = () => {
  const dispatch = useDispatch();
  const [show, setShow] = useState(false);
  const inputRef = useRef(null);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleSubmit = ({ name }, actions) => dispatch(newChannelThunk({ name }))
    .then((action) => {
      actions.setSubmitting(false);
      if (action.type.includes('fulfilled')) {
        actions.resetForm();
        handleClose();
      } else {
        const error = action.payload;
        actions.setFieldError('name', error);
      }
    });

  useEffect(() => {
    if (show) {
      inputRef.current.focus();
    }
  });

  return (
    <>
      <Button variant="link" className="ml-auto p-0" onClick={handleShow}>
        +
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add Channel</Modal.Title>
        </Modal.Header>
        <Formik
          initialValues={{
            name: '',
          }}
          onSubmit={handleSubmit}
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
                  ref={inputRef}
                  type="text"
                  id="name"
                  name="name"
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
                <Button variant="secondary" onClick={handleClose}>
                  Cancel
                </Button>
                <Button variant="primary" type="submit" disabled={isSubmitting}>
                  Submit
                </Button>
              </Modal.Footer>
            </Form>
          )}
        </Formik>
      </Modal>
    </>
  );
};

export default AddChannel;
