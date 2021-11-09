import React from 'react';
import {
  ButtonGroup, Button, Dropdown, Nav,
} from 'react-bootstrap';
import { shallowEqual, useSelector, useDispatch } from 'react-redux';
import { changeCurrentChannel } from './channelsSlice.js';
import getModal from '../modals';
import { openModal, closeModal } from '../modals/modalsSlice.js';

const renderModal = ({ modalInfo, hideModal }) => {
  if (!modalInfo.type) {
    return null;
  }

  const Component = getModal(modalInfo.type);
  return <Component modalInfo={modalInfo} onHide={hideModal} />;
};

const renderChannel = ({
  channel,
  currentChannelId,
  handleChangeChannel,
  showModal,
}) => {
  const { id } = channel;
  const variant = id === currentChannelId ? 'secondary' : 'light';
  const channelButton = (
    <Button block style={{ minWidth: 0 }} variant={variant} onClick={handleChangeChannel(id)} className="rounded-0">
      <div align="justify" style={{ textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap' }}>
        #
        {' '}
        {channel.name}
      </div>
    </Button>
  );

  if (channel.removable) {
    return (
      <Nav.Item key={id} className="btn-block" as={ButtonGroup}>
        {channelButton}
        <Dropdown.Toggle split variant={variant} />
        <Dropdown.Menu>
          <Dropdown.Item onClick={() => showModal('remove', channel)}>Remove</Dropdown.Item>
          <Dropdown.Item onClick={() => showModal('rename', channel)}>Rename</Dropdown.Item>
        </Dropdown.Menu>
      </Nav.Item>
    );
  }
  return (
    <Nav.Item key={id}>
      {channelButton}
    </Nav.Item>
  );
};

const Channels = () => {
  const channels = useSelector((state) => state.channelsInfo.channels, shallowEqual);
  const currentChannelId = useSelector((state) => state.channelsInfo.currentChannelId);
  const modalInfo = useSelector((state) => state.modalInfo);

  const dispatch = useDispatch();
  const handleChangeChannel = (id) => () => {
    dispatch(changeCurrentChannel({ data: { id } }));
  };

  const hideModal = () => dispatch(closeModal());
  const showModal = (type, item = null) => dispatch(openModal({ type, item }));

  return (
    <>
      <div className="d-flex mb-2 pl-4 pr-2 justify-content-between">
        <span>
          Channels
        </span>
        <Button variant="link" className="p-0 text-secondary" onClick={() => showModal('add')}>
          +
        </Button>
      </div>
      <Nav className="flex-column px-2" variant="pills" fill>
        <div className="overflow-auto w-100">
          {channels.map((channel) => renderChannel({
            channel, currentChannelId, handleChangeChannel, showModal,
          }))}
        </div>
        {renderModal({ modalInfo, hideModal })}
      </Nav>
    </>
  );
};

export default Channels;
