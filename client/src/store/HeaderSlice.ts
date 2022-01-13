/* Library import */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
/* State Type 설정 */
export interface header {
  isScrolled: boolean;
  scrollCount: number;
}

/* State 초기값 설정 */
const initialState: header = {
  isScrolled: false,
  scrollCount: 0,
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
  },
});

export const { setIsScrolled, setScrollCount } = headerSlice.actions;
export default headerSlice.reducer;
