import { createSlice } from '@reduxjs/toolkit';

const modalsSlice = createSlice({
  name: 'modalInfo',
  initialState: { isOpen: false, type: null, item: null },
  reducers: {
    openModal(state, action) {
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

export const { openModal, closeModal } = modalsSlice.actions;

export default modalsSlice.reducer;
