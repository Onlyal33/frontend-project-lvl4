import React, { useRef, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import {
  Modal, Button, FormControl, InputGroup,
} from 'react-bootstrap';
import { Formik, Form } from 'formik';

import { newChannelThunk } from '../../features/channelsSlice';

const Add = ({ onHide }) => {
  const dispatch = useDispatch();
  const handleSubmit = ({ name }, actions) => dispatch(newChannelThunk({ name }))
    .then((action) => {
      actions.setSubmitting(false);
      if (action.type.includes('fulfilled')) {
        actions.resetForm();
        onHide();
      } else {
        const error = action.payload;
        actions.setFieldError('name', error);
      }
    });

  const modalRef = useRef();
  useEffect(() => {
    modalRef.current.focus();
  }, []);

  return (
    <Modal show onHide={onHide}>
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
              <Button variant="secondary" onClick={onHide}>
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
  );
};

export default Add;
