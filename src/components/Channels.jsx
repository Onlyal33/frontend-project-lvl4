import React, { useEffect } from 'react';
import { Button } from 'react-bootstrap';
import { shallowEqual, useSelector, useDispatch } from 'react-redux';
import { changeCurrentChannel } from '../features/channelsSlice';
import AddChannel from './AddChannel';

const renderChannel = ({ name, id }, currentChannelId, handleChangeChannel) => {
  const isActive = id === currentChannelId;
  return (
    <Button key={id} block variant={isActive ? 'primary' : 'light'} onClick={handleChangeChannel(id)}>
      <span className="text-wrap text-break">{name}</span>
    </Button>
  );
};

const Channels = ({ messageInputRef }) => {
  const channels = useSelector((state) => Object.values(state.channels.byId), shallowEqual);
  const currentChannelId = useSelector((state) => state.channels.currentChannelId);
  const dispatch = useDispatch();

  const handleChangeChannel = (id) => () => {
    dispatch(changeCurrentChannel({ id }));
  };

  useEffect(() => {
    messageInputRef.current.focus();
  });

  if (channels.length === 0) {
    return null;
  }

  return (
    <div className="col-3 d-flex flex-column h-100 border-right">
      <div className="d-flex flex-row">
        <span className="p-0">
          Channels
        </span>
        <AddChannel />
      </div>
      <div className="overflow-auto">
        {channels.map((channel) => renderChannel(channel, currentChannelId, handleChangeChannel))}
      </div>
    </div>
  );
};

export default Channels;
