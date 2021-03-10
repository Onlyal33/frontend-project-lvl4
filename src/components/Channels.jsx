import React from 'react';
import { ListGroup, Button } from 'react-bootstrap';
import { shallowEqual, useSelector, useDispatch } from 'react-redux';
import { changeCurrentChannel } from '../features/channelsSlice';

const renderChannel = ({ name, id }, currentChannelId, handleClick) => {
  const isActive = id === currentChannelId;
  return (
    <Button key={id} block variant={isActive ? 'primary' : 'light'} onClick={handleClick(id)}>
      {name}
    </Button>
  );
};

const Channels = () => {
  const channels = useSelector((state) => Object.values(state.channels.byId), shallowEqual);
  const currentChannelId = useSelector((state) => state.channels.currentChannelId);
  const dispatch = useDispatch();

  const handleClick = (id) => () => {
    dispatch(changeCurrentChannel({ id }));
  };

  if (channels.length === 0) {
    return null;
  }

  return (
    <ListGroup>
      {channels.map((channel) => renderChannel(channel, currentChannelId, handleClick))}
    </ListGroup>
  );
};

export default Channels;
