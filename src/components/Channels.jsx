import React from 'react';
import { ListGroup, Button } from 'react-bootstrap';
import { shallowEqual, useSelector } from 'react-redux';
// need to add redux dispatch here

const renderChannel = ({ name, id }, isActive) => (
  <Button key={id} block variant={isActive ? 'primary' : 'light'}>
    {name}
  </Button>
);

const Channels = () => {
  const channels = useSelector((state) => Object.values(state.channels.byId), shallowEqual);
  const currentChannelId = useSelector((state) => state.channels.currentChannelId);

  if (channels.length === 0) {
    return null;
  }

  return (
    <ListGroup>
      {channels.map((channel) => renderChannel(channel, channel.id === currentChannelId))}
    </ListGroup>
  );
};

export default Channels;
