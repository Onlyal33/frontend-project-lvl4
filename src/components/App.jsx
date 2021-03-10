import React, { useRef, useEffect } from 'react';
import Channels from './Channels';
import Messages from './Messages';
import MessageForm from './MessageForm';
import NicknameContext, { getNickname } from './nickname';

const App = () => {
  const messageInputRef = useRef();
  useEffect(() => {
    messageInputRef.current.focus();
  });

  return (
    <NicknameContext.Provider value={getNickname()}>
      <div className="row h-100 pb-3">
        <Channels messageInputRef={messageInputRef} />
        <div className="col d-flex flex-column h-100">
          <div className="chat-messages overflow-auto mb-3">
            <Messages />
          </div>
          <div className="mt-auto">
            <MessageForm inputRef={messageInputRef} />
          </div>
        </div>
      </div>
    </NicknameContext.Provider>
  );
};

export default App;
