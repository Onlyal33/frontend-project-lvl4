import React from 'react';
import classNames from 'classnames';

const renderChannel = ({ name, id }, currentChannelId) => {
  const classes = {
    'list-group-item list-group-item-action': true,
    active: id === currentChannelId,
  };

  return (
    <button key={id} type="button" className={classNames(classes)}>
      {name}
    </button>
  );
};

const Channels = ({ channels, currentChannelId }) => {
  if (channels.length === 0) {
    return null;
  }

  return (
    <div className="list-group col-2">
      {channels.map((c) => renderChannel(c, currentChannelId))}
    </div>
  );
};

export default Channels;
