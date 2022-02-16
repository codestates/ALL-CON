/* Library import */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
/* State Type 설정 */
export interface header {
  isScrolled: boolean;
  scrollCount: number;
  timerMessage: string;
  headerAllConcerts: any[];
  headerIsRendered: boolean;
  isPaused: boolean;
}

/* State 초기값 설정 */
const initialState: header = {
  isScrolled: false,
  scrollCount: 0,
  timerMessage: '',
  headerAllConcerts: [],
  headerIsRendered: false,
  isPaused: false,
};

const headerSlice = createSlice({
  name: 'header',
  initialState: initialState,
  reducers: {
    /* Action 설정 */
    setIsScrolled: (state: header, { payload }: PayloadAction<boolean>) => {
      state.isScrolled = payload;
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
  },
});

export const {
  setIsScrolled,
  setScrollCount,
  setTimerMessage,
  setHeaderAllConcerts,
  setHeaderIsRendered,
  setIsPaused,
} = headerSlice.actions;
export default headerSlice.reducer;
