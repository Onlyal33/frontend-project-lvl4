import React, { useContext, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Formik, Form } from 'formik';
import {
  Button, Col, Row, FormControl, InputGroup,
} from 'react-bootstrap';
import { sendMessageThunk } from './messagesSlice';
import NicknameContext from '../../common/nickname';

const MessageForm = () => {
  const currentChannelId = useSelector((state) => state.currentChannelId);
  const inputRef = useRef();

  useEffect(() => {
    inputRef.current.focus();
  }, [currentChannelId]);

  const dispatch = useDispatch();
  const nickname = useContext(NicknameContext);
  const handleSubmit = ({ message }, actions) => dispatch(sendMessageThunk({ message, nickname }))
    .then((action) => {
      actions.setSubmitting(false);
      if (action.type.includes('fulfilled')) {
        actions.resetForm();
      } else {
        const error = action.payload;
        actions.setFieldError('message', error);
      }
      inputRef.current.focus();
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
                <FormControl
                  type="text"
                  id="message"
                  name="message"
                  aria-label="message"
                  onChange={handleChange}
                  placeholder="Write your message here"
                  value={values.message}
                  isInvalid={!!errors.message}
                  disabled={isSubmitting}
                  ref={inputRef}
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
