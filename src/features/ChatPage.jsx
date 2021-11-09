import React, { useContext, useEffect } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { Button, Navbar, Container } from 'react-bootstrap';
import Channels from './channels/Channels.jsx';
import MessagesHeader from './messages/MessagesHeader.jsx';
import Messages from './messages/Messages.jsx';
import MessageForm from './messages/MessageForm.jsx';
import AuthContext from '../contexts/AuthContext.js';
import { setInitialState } from './channels/channelsSlice.js';
import routes from '../common/routes.js';

const ChatPage = () => {
  const auth = useContext(AuthContext);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        const headers = { Authorization: `Bearer ${auth.getUserId()}` };
        const { data } = await axios.get(routes.dataPath(), { headers });
        dispatch(setInitialState(data));
      } catch (e) {
        console.log(e);
        throw e;
      }
    };
    fetchInitialData();
  }, []);

  return (
    <div className="h-100">
      <div className="d-flex flex-column h-100">
        <Navbar bg="light" expand="lg" className="shadow-sm">
          <Container>
            <Navbar.Brand href="/">Hexlet-Chat</Navbar.Brand>
            <Button onClick={auth.logOut}>Log Out</Button>
          </Container>
        </Navbar>
        <Container className="h-100 overflow-hidden rounded shadow my-4">
          <div className="row h-100 bg-white flex-md-row">
            <div className="col-4 col-md-2 border-end pt-5 px-0 bg-light">
              <Channels />
            </div>
            <div className="col d-flex flex-column p-0 h-100">
              <div className="bg-light mb-4 p-3 shadow-sm small">
                <MessagesHeader />
              </div>
              <div className="chat-messages overflow-auto px-5">
                <Messages />
              </div>
              <div className="mt-auto px-5 py-3">
                <MessageForm />
              </div>
            </div>
          </div>
        </Container>
      </div>
    </div>
  );
};

export default ChatPage;
