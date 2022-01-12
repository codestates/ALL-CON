import { createSlice, PayloadAction } from '@reduxjs/toolkit';
/* State Type 설정 */
interface main {
  order: string[];
}
/* State 초기값 설정 */
const initialState: main = { order: ['hot', 'near', 'new'] };

const mainSlice = createSlice({
  name: 'main',
  initialState: initialState,
  reducers: {
    /* Action 설정 */
    setOrder: (state: main, { payload }: PayloadAction<string[]>) => {
      state.order = payload;
    },
  },
});

export const { setOrder } = mainSlice.actions;
export default mainSlice.reducer;
