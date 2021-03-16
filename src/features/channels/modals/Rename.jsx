import React, { useRef, useEffect } from 'react';
import { useSelector } from 'react-redux';
import {
  Modal, Button, FormControl, InputGroup,
} from 'react-bootstrap';
import { Formik, Form } from 'formik';
import axios from 'axios';
import routes from '../../../common/routes.js';

const generateOnSubmit = ({ onHide, item }) => async ({ name }, actions) => {
  const path = routes.channelPath(item.id);
  try {
    await axios.patch(path, { data: { attributes: { ...item, name: name.trim() } } });
    onHide();
  } catch (e) {
    actions.setSubmitting(false);
    actions.setFieldError('name', e.message);
  }
};

const getFiletredChannelNames = (idToRename) => (state) => state.channelsInfo.channels
  .filter(({ id }) => id !== idToRename)
  .map(({ name }) => name);

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

const Rename = ({ onHide, modalInfo: { item } }) => {
  const modalRef = useRef();
  useEffect(() => {
    modalRef.current.select();
  }, []);

  const filteredchannelNames = useSelector(getFiletredChannelNames(item.id));

  return (
    <Modal show onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>Rename Channel</Modal.Title>
      </Modal.Header>
      <Formik
        initialValues={{
          name: item.name,
        }}
        validate={validate(filteredchannelNames)}
        onSubmit={generateOnSubmit({ onHide, item })}
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
