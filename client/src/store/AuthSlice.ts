/* Store import */
import { persistor } from '../index';
/* Library import */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
/* State Type 설정 */
export interface auth {
  isLogin: boolean;
  yearList: Array<string>;
  monthList: Array<string>;
  dateList: Array<string>;
  isPhoneCertificatePass: boolean;
  certificateInfo: string;
  userInfo: {
    id?: number;
    email?: string;
    password?: string;
    username?: string;
    image?: string;
    introduction?: string;
    phone_number?: string;
    birth?: string;
    gender?: string;
    role?: number;
    sign_method?: string;
    email_key?: string;
    massage_key?: string;
    createdAt?: Date;
    updatedAt?: Date;
  }
}
/* State 초기값 설정 */
const initialState: auth = { 
  isLogin: false, 
  userInfo: {}, 
  yearList: [], 
  monthList: [], 
  dateList: [], 
  isPhoneCertificatePass: false, 
  certificateInfo: '' };

const authSlice = createSlice({
  name: 'auth',
  initialState: initialState,
  reducers: {
    /* Action 설정 */
    login: (state: auth) => { 
      state.isLogin = true;
    },
    logout: (state: auth) => { 
      state.isLogin = false;
      /* 로그아웃시 persistStore의 데이터를 전부 삭제 */
      setTimeout(() => persistor.purge(), 500);
    },
    getUserInfo: (state: auth, { payload }: PayloadAction<object>) => { 
      state.userInfo = payload;
    },
    getPhoneCertificatePassInfo: (state: auth, { payload }: PayloadAction<boolean>) => { 
      state.isPhoneCertificatePass = payload;
    },
    getCertificateInfo: (state: auth, { payload }: PayloadAction<string>) => { 
      state.certificateInfo = payload;
    },
    getYearList: (state: auth, { payload }: PayloadAction<Array<string>>) => { 
      state.yearList = payload;
    },
    getMonthList: (state: auth, { payload }: PayloadAction<Array<string>>) => { 
      state.monthList = payload;
    },
    getDateList: (state: auth, { payload }: PayloadAction<Array<string>>) => { 
      state.dateList = payload;
    },
  }
});

export const { login, logout, getUserInfo, getCertificateInfo, getPhoneCertificatePassInfo,  getYearList, getMonthList,  getDateList } = authSlice.actions;
export default authSlice.reducer;