/* Library import */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
/* State Type 설정 */
export interface header {
  isScrolled: boolean;
  scrollCount: number;
  timerMessage: string | number;
}

/* State 초기값 설정 */
const initialState: header = {
  isScrolled: false,
  scrollCount: 0,
  timerMessage: '',
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
    setTimerMessage: (
      state: header,
      { payload }: PayloadAction<string | number>,
    ) => {
      state.timerMessage = payload;
    },
  },
});

export const { setIsScrolled, setScrollCount, setTimerMessage } =
  headerSlice.actions;
export default headerSlice.reducer;
