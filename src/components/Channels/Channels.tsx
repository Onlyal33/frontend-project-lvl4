import Button from 'react-bootstrap/Button';
import Nav from 'react-bootstrap/Nav';
import { shallowEqual } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { useAppSelector } from '../../redux/hooks';
import { selectChannels } from '../../redux/features/channels/selectors';
import useModal from '../../hooks/useModal';
import add from '../../assets/add.svg';
import Channel from '../Channel/Channel';

export default function Channels() {
  const channels = useAppSelector(selectChannels, shallowEqual);
  const { t } = useTranslation();
  const { showModal } = useModal();

  return (
    <>
      <div className="d-flex mb-2 ps-4 pe-2 justify-content-between">
        <span>{t('main.channels')}</span>
        <Button
          variant="link"
          className="p-0 text-primary"
          onClick={() => showModal('add')}
        >
          <img src={add} alt={t('main.button.add')}></img>
        </Button>
      </div>
      <Nav className="flex-column px-2" variant="pills" fill>
        {channels.map((channel) => (
          <Channel key={channel.id} channel={channel} />
        ))}
      </Nav>
    </>
  );
}
