import React, { useRef, useEffect } from 'react';
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

const selectMessagesByChannelId = (state) => {
  const { currentChannelId } = state;
  return state.messages
    .filter(({ channelId }) => channelId === currentChannelId);
};

const Messages = () => {
  const filteredMessages = useSelector(selectMessagesByChannelId, shallowEqual);

  const bottomRef = useRef();

  useEffect(() => {
    if (filteredMessages.length > 0) {
      bottomRef.current.scrollIntoView();
    }
  }, [filteredMessages]);

  if (filteredMessages.length === 0) {
    return null;
  }

  return (
    <>
      <ListGroup>
        {filteredMessages.map(renderMessage)}
      </ListGroup>
      <div ref={bottomRef} />
    </>
  );
};

export default Messages;
