import React from 'react';
import { useSelector } from 'react-redux';

const getChannelName = (state) => {
  const { currentChannelId } = state.channelsInfo;
  return state.channelsInfo.channels
    .find(({ id }) => id === currentChannelId)
    ?.name;
};

const getMessagesCountByChannelId = (state) => {
  const { currentChannelId } = state.channelsInfo;
  return state.messages
    .filter(({ channelId }) => channelId === currentChannelId)
    .length;
};

const MessagesHeader = () => {
  const channelName = useSelector(getChannelName);
  const messagesCount = useSelector(getMessagesCountByChannelId);

  return (
    <>
      <p className="m-0">
        <b>
          #
          {' '}
          {channelName || ''}
        </b>
      </p>
      <span className="text-muted">
        {messagesCount}
        {' '}
        messages
      </span>
    </>
  );
};

export default MessagesHeader;
