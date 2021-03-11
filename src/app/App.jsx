import React, { useRef, useEffect } from 'react';
import Channels from '../features/channels/Channels';
import Messages from '../features/messages/Messages';
import MessageForm from '../features/messages/MessageForm';
import NicknameContext, { getNickname } from '../common/nickname';

const App = () => {
  const messageInputRef = useRef(null);
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
