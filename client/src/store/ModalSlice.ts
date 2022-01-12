/* Library import */
import { createSlice } from '@reduxjs/toolkit';
/* State Type 설정 */
export interface modal {
  loginModal: boolean;
  signupModal: boolean;
  tosModal: boolean;
  privacyModal: boolean;
  sideMenuModal: boolean;
}
/* State 초기값 설정 */
const initialState: modal = {
  loginModal: false,
  signupModal: false,
  tosModal: false,
  privacyModal: false,
  sideMenuModal: false,
};

const modalSlice = createSlice({
  name: 'modal',
  initialState: initialState,
  reducers: {
    /* Action 설정 */
    showLoginModal: (state, { payload }) => {
      state.loginModal = payload;
    },
    showSignupModal: (state, { payload }) => {
      state.signupModal = payload;
    },
    showTosModal: (state, { payload }) => {
      state.tosModal = payload;
    },
    showPrivacyModal: (state, { payload }) => {
      state.privacyModal = payload;
    },
    showSideMenuModal: (state, { payload }) => {
      state.sideMenuModal = payload;
    },
  },
});

export const {
  showLoginModal,
  showSignupModal,
  showTosModal,
  showPrivacyModal,
  showSideMenuModal,
} = modalSlice.actions;
export default modalSlice.reducer;
