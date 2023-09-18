/* eslint-disable react/destructuring-assignment */
import React, { useRef, useEffect } from 'react';
import { shallowEqual, useSelector } from 'react-redux';
import { ListGroup } from 'react-bootstrap';
import { useProfanityFilter } from '../../contexts/ProfanityFilterContext.jsx';

const renderMessage = ({ id, username, body }) => (
  <span key={id} className="text-wrap text-break">
    <b>{username}</b>
    :
    {' '}
    {body}
  </span>
);

const selectMessagesByChannelId = (state) => {
  const { currentChannelId } = state.channelsInfo;
  return state.messages
    .filter(({ channelId }) => channelId === currentChannelId);
};

const Messages = () => {
  const filterProfanity = useProfanityFilter();
  const filteredMessages = useSelector(selectMessagesByChannelId, shallowEqual);

  const bottomRef = useRef();

  useEffect(() => {
    bottomRef.current?.scrollIntoView();
  }, [filteredMessages]);

  if (filteredMessages.length === 0) {
    return null;
  }

  return (
    <>
      <ListGroup>
        {filteredMessages
          .map((message) => ({ ...message, body: filterProfanity.clean(message.body) }))
          .map(renderMessage)}
      </ListGroup>
      <div ref={bottomRef} />
    </>
  );
};

export default Messages;
