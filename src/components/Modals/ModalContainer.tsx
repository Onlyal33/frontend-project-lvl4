import Modal from 'react-bootstrap/Modal';
import { useTranslation } from 'react-i18next';
import { selectModal } from '../../redux/features/modals/selectors';
import { useAppSelector } from '../../redux/hooks';
import useModal from '../../hooks/useModal';
import Add from './Add';
import Remove from './Remove';
import Rename from './Rename';

export default function ModalContainer() {
  const modalInfo = useAppSelector(selectModal);
  const { t } = useTranslation();
  const { hideModal } = useModal();

  if (!modalInfo.type) {
    return null;
  }

  const Component = getModal(modalInfo.type);

  return (
    <Modal show onHide={hideModal}>
      <Modal.Header closeButton>
        <Modal.Title>{t(`modal.header.${modalInfo.type}`)}</Modal.Title>
      </Modal.Header>
      <Component />
    </Modal>
  );
}

const modals = {
  add: Add,
  remove: Remove,
  rename: Rename,
};

const getModal = (modalName: keyof typeof modals) => modals[modalName];
