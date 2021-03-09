import React from 'react';
import { shallowEqual, useSelector } from 'react-redux';

const renderMessage = ({ id, nickname, message }) => (
  <li key={id} className="list-group-item">
    <b>{nickname}</b>
    :
    {' '}
    {message}
  </li>
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
    <ul className="list-group">
      {filteredMessages.map(renderMessage)}
    </ul>
  );
};

export default Messages;
