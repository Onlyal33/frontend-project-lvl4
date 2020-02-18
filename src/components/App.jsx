import React from 'react';
import Channels from './Channels.jsx';

const App = ({ data }) => {
  const { channels, currentChannelId } = data; // messages, currentChannelId
  return (
  <div>
    <Channels channels={channels} currentChannelId={currentChannelId}/>
  </div>
  );
};

export default App;
