/* Library import */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
/* State Type 설정 */
export interface modal {
  loginModal: boolean;
  signupModal: boolean;
  tosModal: boolean;
  privacyModal: boolean;
  sideMenuModal: boolean;
  findPasswordModal: boolean;
  confirmNumberModal: boolean;
  resetPasswordModal: boolean;
  alertModal: boolean;
  myDropDown: boolean;
  concertModal: boolean;
  phoneConfirmNumberModal: boolean;
  alertText: string;
  deliverText: string;
  conChinWritingModal: boolean;
  conChinProfileModal: boolean;
}

/* State 초기값 설정 */
const initialState: modal = {
  loginModal: false,
  signupModal: false,
  tosModal: false,
  privacyModal: false,
  findPasswordModal: false,
  confirmNumberModal: false,
  resetPasswordModal: false,
  alertModal: false,
  sideMenuModal: false,
  myDropDown: false,
  concertModal: false,
  phoneConfirmNumberModal: false,
  alertText: '',
  deliverText: '',
  conChinWritingModal: false,
  conChinProfileModal: false,
};

const modalSlice = createSlice({
  name: 'modal',
  initialState: initialState,
  reducers: {
    /* Action 설정 */
    showLoginModal: (state: modal, { payload }: PayloadAction<boolean>) => {
      state.loginModal = payload;
    },
    showSignupModal: (state: modal, { payload }: PayloadAction<boolean>) => {
      state.signupModal = payload;
    },
    showTosModal: (state: modal, { payload }: PayloadAction<boolean>) => {
      state.tosModal = payload;
    },
    showPrivacyModal: (state: modal, { payload }: PayloadAction<boolean>) => {
      state.privacyModal = payload;
    },
    showSideMenuModal: (state: modal, { payload }: PayloadAction<boolean>) => {
      state.sideMenuModal = payload;
    },
    showFindPasswordModal: (
      state: modal,
      { payload }: PayloadAction<boolean>,
    ) => {
      state.findPasswordModal = payload;
    },
    showConfirmNumberModal: (
      state: modal,
      { payload }: PayloadAction<boolean>,
    ) => {
      state.confirmNumberModal = payload;
    },
    showPhoneConfirmNumberModal: (
      state: modal,
      { payload }: PayloadAction<boolean>,
    ) => {
      state.phoneConfirmNumberModal = payload;
    },
    showResetPasswordModal: (
      state: modal,
      { payload }: PayloadAction<boolean>,
    ) => {
      state.resetPasswordModal = payload;
    },
    showAlertModal: (state: modal, { payload }: PayloadAction<boolean>) => {
      state.alertModal = payload;
    },
    showConcertModal: (state: modal, { payload }: PayloadAction<boolean>) => {
      state.concertModal = payload;
    },
    insertAlertText: (state: modal, { payload }: PayloadAction<string>) => {
      state.alertText = payload;
    },
    showMyDropDown: (state: modal, { payload }: PayloadAction<boolean>) => {
      state.myDropDown = payload;
    },
    insertDeliverText: (state: modal, { payload }: PayloadAction<string>) => {
      state.deliverText = payload;
    },
    showConChinWritingModal: (
      state: modal,
      { payload }: PayloadAction<boolean>,
    ) => {
      state.conChinWritingModal = payload;
    },
    showConChinProfileModal: (
      state: modal,
      { payload }: PayloadAction<boolean>,
    ) => {
      state.conChinProfileModal = payload;
    },
  },
});

export const {
  showLoginModal,
  showSignupModal,
  showTosModal,
  showPrivacyModal,
  showFindPasswordModal,
  showConfirmNumberModal,
  showPhoneConfirmNumberModal,
  showResetPasswordModal,
  showAlertModal,
  showConcertModal,
  showSideMenuModal,
  showMyDropDown,
  insertAlertText,
  insertDeliverText,
  showConChinWritingModal,
  showConChinProfileModal,
} = modalSlice.actions;
export default modalSlice.reducer;
