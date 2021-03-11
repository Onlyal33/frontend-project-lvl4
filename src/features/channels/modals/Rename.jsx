import React, { useRef, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import {
  Modal, Button, FormControl, InputGroup,
} from 'react-bootstrap';
import { Formik, Form } from 'formik';

import { patchChannelThunk } from '../channelsSlice';

const Rename = ({ onHide, modalInfo: { item } }) => {
  const dispatch = useDispatch();
  const handleSubmit = ({ name }, actions) => dispatch(patchChannelThunk({ ...item, name }))
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
    modalRef.current.select();
  }, []);

  return (
    <Modal show onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>Rename Channel</Modal.Title>
      </Modal.Header>
      <Formik
        initialValues={{
          name: item.name,
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

export default Rename;
