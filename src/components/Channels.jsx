import React, { useState, useEffect } from 'react';
import { ButtonGroup, Button, Dropdown } from 'react-bootstrap';
import { shallowEqual, useSelector, useDispatch } from 'react-redux';
import { changeCurrentChannel } from '../features/channelsSlice';
import getModal from './modals';

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
  const variant = id === currentChannelId ? 'primary' : 'light';
  const channelButton = (
    <Button block variant={variant} onClick={handleChangeChannel(id)}>
      <span className="text-wrap text-break">{channel.name}</span>
    </Button>
  );

  if (channel.removable) {
    return (
      <Dropdown key={id} className="btn-block" as={ButtonGroup}>
        {channelButton}
        <Dropdown.Toggle split variant={variant} />
        <Dropdown.Menu>
          <Dropdown.Item onClick={() => showModal('remove', channel)}>Remove</Dropdown.Item>
          <Dropdown.Item onClick={() => showModal('rename', channel)}>Rename</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    );
  }
  return (
    <React.Fragment key={id}>
      {channelButton}
    </React.Fragment>
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
  }, [currentChannelId]);

  const [modalInfo, setModalInfo] = useState({ type: null, item: null });
  const hideModal = () => setModalInfo({ type: null, item: null });
  const showModal = (type, item = null) => setModalInfo({ type, item });

  return (
    <>
      <div className="col-3 d-flex flex-column h-100 border-right">
        <div className="d-flex flex-row">
          <span className="p-0">
            Channels
          </span>
          <Button variant="link" className="ml-auto p-0" onClick={() => showModal('add')}>
            +
          </Button>
        </div>
        <div className="overflow-auto">
          {channels.map((channel) => renderChannel({
            channel, currentChannelId, handleChangeChannel, showModal,
          }))}
        </div>
      </div>
      {renderModal({ modalInfo, hideModal })}
    </>
  );
};

export default Channels;
