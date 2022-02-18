/* Library import */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
/* State Type 설정 */

export interface header {
  isClosed: boolean;
  scrollCount: number;
  timerMessage: string;
  headerAllConcerts: any[];
  headerIsRendered: boolean;
  isPaused: boolean;
  // headerTimerArr: any[];
}

/* State 초기값 설정 */
const initialState: header = {
  isClosed: false,
  scrollCount: 0,
  timerMessage: '',
  headerAllConcerts: [],
  headerIsRendered: false,
  isPaused: false,
  // headerTimerArr: [],
};

const headerSlice = createSlice({
  name: 'header',
  initialState: initialState,
  reducers: {
    /* Action 설정 */
    setIsClosed: (state: header, { payload }: PayloadAction<boolean>) => {
      state.isClosed = payload;
    },
    setScrollCount: (state: header, { payload }: PayloadAction<number>) => {
      state.scrollCount = payload;
    },
    setTimerMessage: (state: header, { payload }: PayloadAction<string>) => {
      state.timerMessage = payload;
    },
    setHeaderAllConcerts: (
      state: header,
      { payload }: PayloadAction<Array<any>>,
    ) => {
      state.headerAllConcerts = payload;
    },
    setHeaderIsRendered: (
      state: header,
      { payload }: PayloadAction<boolean>,
    ) => {
      state.headerIsRendered = payload;
    },
    setIsPaused: (state: header, { payload }: PayloadAction<boolean>) => {
      state.isPaused = payload;
    },
    // setHeaderTimerArr: (
    //   state: header,
    //   { payload }: PayloadAction<Array<any>>,
    // ) => {
    //   state.headerTimerArr = [...state.headerTimerArr, payload];
    // },
  },
});

export const {
  setIsClosed,
  setScrollCount,
  setTimerMessage,
  setHeaderAllConcerts,
  setHeaderIsRendered,
  setIsPaused,
  // setHeaderTimerArr,
} = headerSlice.actions;
export default headerSlice.reducer;
