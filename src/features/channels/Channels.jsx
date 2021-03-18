import React from 'react';
import { ButtonGroup, Button, Dropdown } from 'react-bootstrap';
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
  const variant = id === currentChannelId ? 'primary' : 'light';
  const channelButton = (
    <Button block style={{ minWidth: 0 }} variant={variant} onClick={handleChangeChannel(id)}>
      <div align="justify" style={{ textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap' }}>{channel.name}</div>
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
