import React, { useContext } from 'react';
import { Button } from 'react-bootstrap';
import Channels from './channels/Channels.jsx';
import Messages from './messages/Messages.jsx';
import MessageForm from './messages/MessageForm.jsx';
import AuthContext from '../common/AuthContext.js';

const ChatPage = () => {
  const auth = useContext(AuthContext);

  return (
    <>
      <Button onClick={auth.logOut}>Log Out</Button>
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
    </>
  );
};

export default ChatPage;
