import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Dropdown from 'react-bootstrap/Dropdown';
import Nav from 'react-bootstrap/Nav';
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
    <Button
      onClick={handleChangeChannel(id)}
      variant={variant}
      className="w-100 rounded-0 text-start text-truncate"
    >
      # {channel.name}
    </Button>
  );

  if (channel.removable) {
    return (
      <Nav.Item key={id} className="w-100">
        <Dropdown className="d-flex" as={ButtonGroup}>
          {channelButton}
          <Dropdown.Toggle split variant={variant} />
          <Dropdown.Menu>
            <Dropdown.Item onClick={() => showModal('remove', channel)}>
              {t('main.button.remove')}
            </Dropdown.Item>
            <Dropdown.Item onClick={() => showModal('rename', channel)}>
              {t('main.button.rename')}
            </Dropdown.Item>
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
  const channels = useSelector(
    (state) => state.channelsInfo.channels,
    shallowEqual,
  );
  const currentChannelId = useSelector(
    (state) => state.channelsInfo.currentChannelId,
  );
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
        <Button
          variant="link"
          className="p-0 text-primary"
          onClick={() => showModal('add')}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            width="20"
            height="20"
            fill="currentColor"
          >
            <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z" />
            <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z" />
          </svg>
          <span className="visually-hidden">{t('main.button.add')}</span>
        </Button>
      </div>
      <Nav className="flex-column px-2" variant="pills" fill>
        {channels.map((channel) =>
          renderChannel({
            channel,
            currentChannelId,
            handleChangeChannel,
            showModal,
            t,
          }),
        )}
        {renderModal({ modalInfo, hideModal })}
      </Nav>
    </>
  );
};

export default Channels;
