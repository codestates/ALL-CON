/* Library import */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
/* State Type 설정 */
export interface modal {
  loginModal: boolean;
  signupModal: boolean;
  tosModal: boolean;
  privacyModal: boolean;
  findPasswordModal: boolean;
  alertModal: boolean;
  alertText: string;
}
/* State 초기값 설정 */
const initialState: modal = { 
  loginModal: false, 
  signupModal: false, 
  tosModal: false, 
  privacyModal: false,
  findPasswordModal: false,
  alertModal: false,
  alertText: ''
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
    showFindPasswordModal: (state: modal, { payload }: PayloadAction<boolean>) => {
      state.findPasswordModal = payload;
    },
    showAlertModal: (state: modal, { payload }: PayloadAction<boolean>) => {
      state.alertModal = payload;
    },
    insertAlertText: (state: modal, { payload }: PayloadAction<string>) => {
      state.alertText = payload;
    }
  }
});

export const { showLoginModal, showSignupModal, showTosModal, showPrivacyModal, showFindPasswordModal, showAlertModal, insertAlertText } = modalSlice.actions;
export default modalSlice.reducer;