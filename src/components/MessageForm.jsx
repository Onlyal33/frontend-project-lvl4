import React, { useContext } from 'react';
import { useDispatch } from 'react-redux';
import {
  Formik, Form, Field,
} from 'formik';
import {
  Button, Col, Row, FormControl, InputGroup,
} from 'react-bootstrap';
import { sendMessageThunk } from '../features/messagesSlice';
import NicknameContext from './nickname';

const MessageForm = () => {
  const dispatch = useDispatch();
  const nickname = useContext(NicknameContext);

  const handleSubmit = ({ message }, actions) => dispatch(sendMessageThunk({ message, nickname }))
    .then((action) => {
      actions.setSubmitting(false);
      if (action.type === 'messages/sendMessage/fulfilled') {
        actions.resetForm();
      } else {
        const error = action.payload;
        actions.setFieldError('message', error);
      }
    });

  return (
    <Formik
      initialValues={{
        message: '',
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
          <Row>
            <Col>
              <InputGroup>
                <Field
                  type="text"
                  id="message"
                  name="message"
                  aria-label="message"
                  onChange={handleChange}
                  placeholder="Write your message here"
                  value={values.message}
                  isInvalid={!!errors.message}
                  disabled={isSubmitting}
                  component={FormControl}
                />
                <FormControl.Feedback type="invalid">
                  {errors.message}
                </FormControl.Feedback>
              </InputGroup>
            </Col>
            <Col xs="auto">
              <Button type="submit" disabled={isSubmitting}>
                Send
              </Button>
            </Col>
          </Row>
        </Form>
      )}
    </Formik>
  );
};

export default MessageForm;
