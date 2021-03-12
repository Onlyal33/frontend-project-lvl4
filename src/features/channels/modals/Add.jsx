import React, { useRef, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import {
  Modal, Button, FormControl, InputGroup,
} from 'react-bootstrap';
import { Formik, Form } from 'formik';
import axios from 'axios';
import routes from '../../../common/routes.js';
import { changeCurrentChannel } from '../currentChannelSlice.js';

const generateOnSubmit = ({ onHide, dispatch }) => async ({ name }, actions) => {
  const path = routes.channelsPath();
  try {
    const { data } = await axios.post(path, { data: { attributes: { name } } });
    actions.setSubmitting(false);
    actions.resetForm();
    onHide();
    dispatch(changeCurrentChannel(data));
  } catch (e) {
    actions.setSubmitting(false);
    actions.setFieldError('name', e.message);
  }
};

const Add = ({ onHide }) => {
  const modalRef = useRef();
  useEffect(() => {
    modalRef.current.focus();
  }, []);

  const dispatch = useDispatch();

  return (
    <Modal show onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>Add Channel</Modal.Title>
      </Modal.Header>
      <Formik
        initialValues={{
          name: '',
        }}
        onSubmit={generateOnSubmit({ onHide, dispatch })}
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
