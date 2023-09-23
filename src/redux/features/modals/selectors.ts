import { RootState } from '../../store';

export const selectModal = (state: RootState) => state.modal;

export const selectIsModalOpen = (state: RootState) =>
  selectModal(state).isOpen;

export const selectModalItem = (state: RootState) => selectModal(state).item;
