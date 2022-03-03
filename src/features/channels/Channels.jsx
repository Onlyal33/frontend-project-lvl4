import React from 'react';
import {
  ButtonGroup, Button, Dropdown, Nav,
} from 'react-bootstrap';
import { shallowEqual, useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
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
  t,
}) => {
  const { id } = channel;
  const variant = id === currentChannelId ? 'secondary' : 'light';
  const channelButton = (
    <Button onClick={handleChangeChannel(id)} variant={variant} className="w-100 rounded-0 text-start text-truncate">
      #
      {' '}
      {channel.name}
    </Button>
  );

  if (channel.removable) {
    return (
      <Nav.Item key={id} className="w-100">
        <Dropdown className="d-flex" as={ButtonGroup}>
          {channelButton}
          <Dropdown.Toggle split variant={variant} />
          <Dropdown.Menu>
            <Dropdown.Item onClick={() => showModal('remove', channel)}>{t('main.button.remove')}</Dropdown.Item>
            <Dropdown.Item onClick={() => showModal('rename', channel)}>{t('main.button.rename')}</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </Nav.Item>
    );
  }
  return (
    <Nav.Item key={id} className="w-100">
      {channelButton}
    </Nav.Item>
  );
};

const Channels = () => {
  const channels = useSelector((state) => state.channelsInfo.channels, shallowEqual);
  const currentChannelId = useSelector((state) => state.channelsInfo.currentChannelId);
  const modalInfo = useSelector((state) => state.modalInfo);

  const { t } = useTranslation();

  const dispatch = useDispatch();
  const handleChangeChannel = (id) => () => {
    dispatch(changeCurrentChannel({ id }));
  };

  const hideModal = () => dispatch(closeModal());
  const showModal = (type, item = null) => dispatch(openModal({ type, item }));

  return (
    <>
      <div className="d-flex mb-2 ps-4 pe-2 justify-content-between">
        <span>{t('main.channels')}</span>
        <Button variant="link" className="p-0 text-secondary" onClick={() => showModal('add')}>{t('main.button.add')}</Button>
      </div>
      <Nav className="flex-column px-2" variant="pills" fill>
        {channels.map((channel) => renderChannel({
          channel, currentChannelId, handleChangeChannel, showModal, t,
        }))}
        {renderModal({ modalInfo, hideModal })}
      </Nav>
    </>
  );
};

export default Channels;
