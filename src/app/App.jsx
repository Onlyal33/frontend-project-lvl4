import React from 'react';
import Channels from '../features/channels/Channels';
import Messages from '../features/messages/Messages';
import MessageForm from '../features/messages/MessageForm';
import NicknameContext, { getNickname } from '../common/nickname';

const App = () => (
  <NicknameContext.Provider value={getNickname()}>
    <div className="row h-100 pb-3">
      <Channels />
      <div className="col d-flex flex-column h-100">
        <div className="chat-messages overflow-auto mb-3">
          <Messages />
        </div>
        <div className="mt-auto">
          <MessageForm />
        </div>
      </div>
    </div>
  </NicknameContext.Provider>
);

export default App;
