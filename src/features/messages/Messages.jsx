import React from 'react';
import { connect } from 'react-redux';
import { addMessage } from 'features/messages/messagesSlice';

const mapStateToProps = (state) => {
  const { messages, currentChannelId } = state;
  return {
    messages: messages.filter(({ channelId }) => channelId === currentChannelId),
  };
};

const mapDispatchToProps = { addMessage };

const renderMessage = ({ id, nickname, body }) => (
  <li key={id} className="list-group-item"><b>{nickname}</b>: {body}</li>
);

const Messages = ({ messages }) => {
  if (messages.length === 0) {
    return null;
  }

  return (
    <ul className="list-group">
      {messages.map(renderMessage)}
    </ul>
  );
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Messages);
