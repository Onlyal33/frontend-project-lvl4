import { useCallback } from 'react';
import { closeModal, openModal } from '../redux/features/modals';
import { useAppDispatch } from '../redux/hooks';
import { ChannelType, ModalType } from '../types';

const useModal = () => {
  const dispatch = useAppDispatch();

  const hideModal = useCallback(() => {
    dispatch(closeModal());
  }, [dispatch]);

  const showModal = useCallback(
    (type: ModalType['type'], item: ChannelType | null = null) => {
      dispatch(openModal({ type, item }));
    },
    [dispatch],
  );

  return { hideModal, showModal };
};

export default useModal;
