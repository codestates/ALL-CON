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
  alertModal: boolean;
  alertText: string;
  myDropDown: boolean;
}

/* State 초기값 설정 */
const initialState: modal = {
  loginModal: false,
  signupModal: false,
  tosModal: false,
  privacyModal: false,
  findPasswordModal: false,
  alertModal: false,
  alertText: '',
  sideMenuModal: false,
  myDropDown: false,
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
    showSideMenuModal: (state, { payload }) => {
      state.sideMenuModal = payload;
    },
    showFindPasswordModal: (
      state: modal,
      { payload }: PayloadAction<boolean>,
    ) => {
      state.findPasswordModal = payload;
    },
    showAlertModal: (state: modal, { payload }: PayloadAction<boolean>) => {
      state.alertModal = payload;
    },
    insertAlertText: (state: modal, { payload }: PayloadAction<string>) => {
      state.alertText = payload;
    },
    showMyDropDown: (state: modal, { payload }: PayloadAction<boolean>) => {
      state.myDropDown = payload;
    },
  },
});

export const {
  showLoginModal,
  showSignupModal,
  showTosModal,
  showPrivacyModal,
  showFindPasswordModal,
  showAlertModal,
  insertAlertText,
  showSideMenuModal,
  showMyDropDown,
} = modalSlice.actions;
export default modalSlice.reducer;
