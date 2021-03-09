import React from 'react';
import Channels from './Channels';
import Messages from './Messages';
import MessageForm from './MessageForm';
import NicknameContext, { getNickname } from './nickname';

const App = () => (
  <NicknameContext.Provider value={getNickname()}>
    <div className="row h-100 pb-3">
      <div className="col-3 border-right">
        <Channels />
      </div>
      <div className="col h-100">
        <div className="d-flex flex-column h-100">
          <div className="chat-messages overflow-auto mb-3">
            <Messages />
          </div>
          <div className="mt-auto">
            <MessageForm />
          </div>
        </div>
      </div>
    </div>
  </NicknameContext.Provider>
);

export default App;
