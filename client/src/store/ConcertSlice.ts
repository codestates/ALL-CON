/* Library import */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
/* State Type 설정 */
export interface concert {
  /* concertPage Loading */
  isLoading: boolean;
}

/* State 초기값 설정 */
const initialState: concert = {
  isLoading: false
};

const concertSlice = createSlice({
  name: 'concert',
  initialState: initialState,
  reducers: {
    /* Action 설정 */
    setIsLoading: (state: concert, { payload }: PayloadAction<boolean>) => {
      state.isLoading = payload;
    }
  },
});

export const {
  setIsLoading
} = concertSlice.actions;

export default concertSlice.reducer;
