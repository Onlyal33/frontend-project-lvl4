import React, { useRef, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Modal, Button, FormControl, InputGroup,
} from 'react-bootstrap';
import { Formik, Form } from 'formik';
import axios from 'axios';
import routes from '../../../common/routes.js';
import { changeCurrentChannel } from '../channelsSlice.js';

const generateOnSubmit = ({ onHide, dispatch }) => async ({ name }, actions) => {
  const path = routes.channelsPath();
  try {
    const { data } = await axios.post(path, { data: { attributes: { name: name.trim() } } });
    onHide();
    dispatch(changeCurrentChannel(data));
  } catch (e) {
    actions.setSubmitting(false);
    actions.setFieldError('name', e.message);
  }
};

const getChannelNames = (state) => state.channelsInfo.channels.map(({ name }) => name);

const validate = (channelNames) => (values) => {
  const errors = {};
  const trimmed = values.name.trim();
  if (trimmed.length === 0) {
    errors.name = 'Please enter some text here';
  } else if (channelNames.includes(trimmed)) {
    errors.name = `Channel ${trimmed} already exists`;
  }

  return errors;
};

const Add = ({ onHide }) => {
  const modalRef = useRef();
  const channelNames = useSelector(getChannelNames);

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
        validate={validate(channelNames)}
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
