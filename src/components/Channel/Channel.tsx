import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Dropdown from 'react-bootstrap/Dropdown';
import Nav from 'react-bootstrap/Nav';
import { useTranslation } from 'react-i18next';
import { ChannelType } from '../../types';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { selectcurrentChannelId } from '../../redux/features/channels/selectors';
import { changeCurrentChannel } from '../../redux/features/channels';
import useModal from '../../hooks/useModal';

export default function Channel({ channel }: { channel: ChannelType }) {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const currentId = useAppSelector(selectcurrentChannelId);
  const { id } = channel;
  const variant = id === currentId ? 'secondary' : 'light';
  const { showModal } = useModal();

  const handleChangeChannel = () => {
    id && dispatch(changeCurrentChannel({ id }));
  };

  const channelButton = (
    <Button
      onClick={handleChangeChannel}
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
}
