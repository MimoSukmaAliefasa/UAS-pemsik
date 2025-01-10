import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isSignUpModalOpen: false,
  isSignInModalOpen: true,
  isReportModalOpen: false,
};

const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    openSignUpModal: (state) => {
      state.isSignUpModalOpen = true;
      state.isSignInModalOpen = false;
    },
    openReportModal: (state) => {
      state.isReportModalOpen = true;
    },


    closeReportModal: (state) => {
      state.isReportModalOpen = false;
    },
    openSignInModal: (state) => {
      state.isSignInModalOpen = true;
      state.isSignUpModalOpen = false;
    },
    

  }
});

export const { openSignUpModal, openSignInModal, openReportModal, closeReportModal} = modalSlice.actions;
export default modalSlice.reducer;
