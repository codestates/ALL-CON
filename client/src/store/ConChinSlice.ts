/* Library import */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
/* State Type 설정 */
export interface conChin {
  /*hot,new,near */
  postingOrder: string;
  articleOrder: string;
}

/* State 초기값 설정 */
const initialState: conChin = {
  postingOrder: 'hot',
  articleOrder: 'hot',
};

const conChinSlice = createSlice({
  name: 'conchin',
  initialState: initialState,
  reducers: {
    /* Action 설정 */
    setPostingOrder: (state: conChin, { payload }: PayloadAction<string>) => {
      state.postingOrder = payload;
    },
    setArticleOrder: (state: conChin, { payload }: PayloadAction<string>) => {
      state.articleOrder = payload;
    },
  },
});

export const { setPostingOrder, setArticleOrder } = conChinSlice.actions;
export default conChinSlice.reducer;
