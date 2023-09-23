import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { ModalType } from '../../../types';

const initialState: ModalType = { isOpen: false, type: null, item: null };

const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    openModal(state, action: PayloadAction<ModalType>) {
      state.isOpen = true;
      state.type = action.payload.type;
      state.item = action.payload.item;
    },
    closeModal(state) {
      state.isOpen = false;
      state.type = null;
      state.item = null;
    },
  },
});

export const { openModal, closeModal } = modalSlice.actions;

export default modalSlice.reducer;
