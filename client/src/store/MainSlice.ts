/* Library import */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
/* State Type 설정 */
export interface main {
  order: string;
  target: {
    exclusive?: string;
    open_date?: string;
    post_date?: string;
    image_concert?: string;
    title?: string;
    place?: string;
    view?: number;
  };
}

/* State 초기값 설정 */
const initialState: main = { order: 'hot', target: {} };

const mainSlice = createSlice({
  name: 'main',
  initialState: initialState,
  reducers: {
    /* Action 설정 */
    setOrder: (state: main, { payload }: PayloadAction<string>) => {
      state.order = payload;
    },
    setTarget: (state: main, { payload }: PayloadAction<object>) => {
      state.target = payload;
    },
  },
});

export const { setOrder, setTarget } = mainSlice.actions;
export default mainSlice.reducer;
