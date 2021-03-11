import React from 'react';
import { shallowEqual, useSelector } from 'react-redux';
import { ListGroup } from 'react-bootstrap';

const renderMessage = ({ id, nickname, message }) => (
  <span key={id} className="text-wrap text-break">
    <b>{nickname}</b>
    :
    {' '}
    {message}
  </span>
);

const Messages = () => {
  const selectMessagesByChannelId = (state) => {
    const { currentChannelId } = state.channels;
    return Object.values(state.messages.byId)
      .filter(({ channelId }) => channelId === currentChannelId);
  };

  const filteredMessages = useSelector(selectMessagesByChannelId, shallowEqual);

  if (filteredMessages.length === 0) {
    return null;
  }

  return (
    <ListGroup>
      {filteredMessages.map(renderMessage)}
    </ListGroup>
  );
};

export default Messages;
