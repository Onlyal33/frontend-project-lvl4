import React from 'react';
import { connect } from 'react-redux';
import { useFormik } from 'formik';
import { Modal, FormGroup, FormControl } from 'react-bootstrap';
import { addMessage } from 'features/messages/messagesSlice';

const mapStateToProps = (state) => {
  const { messages, currentChannelId } = state;
  return {
    messages: messages.filter(({ channelId }) => channelId === currentChannelId),
  };
};

const mapDispatchToProps = { addMessage };

const handleSubmit = ({ onHide, setState }) => (values) => {
  setState((draft) => {
    draft.push({ id: _.uniqueId(), nickname, body: values.body });
  });
  onHide();
};

const AddMessage = (props) => {
  const { addMessage, currentChannelId } = props;

  const formik = useFormik({ initialValues: { text: '' }, onSubmit: handleSubmit(props) });

  return (
    <form onSubmit={formik.handleSubmit}>
      <input
        id="message"
        name="body"
        placeholder="Message"
        type="text"
        value={formik.values.body}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        className="form-control"
      />
      {errors.email && touched.email && (
        <div className="input-feedback">{errors.email}</div>
      )}

            <button
              type="button"
              className="outline"
              onClick={handleReset}
              disabled={!dirty || isSubmitting}
            >
              Reset
            </button>
            <button type="submit" disabled={isSubmitting}>
              Submit
            </button>

            <DisplayFormikState {...props} />
          </form>
  );
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(AddMessage);
