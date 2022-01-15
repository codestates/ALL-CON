/* Library import */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
/* State Type 설정 */
export interface conChin {
  /*hot,new,near */
  postingOrder: string;
  articleOrder: string;
  /* 받아온 게시물 목록 */
  allArticles: any[];
}

/* State 초기값 설정 */
const initialState: conChin = {
  postingOrder: 'view',
  articleOrder: 'view',
  allArticles: [],
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
    setAllArticles: (
      state: conChin,
      { payload }: PayloadAction<Array<any>>,
    ) => {
      state.allArticles = payload;
    },
  },
});

export const { setPostingOrder, setArticleOrder, setAllArticles } =
  conChinSlice.actions;
export default conChinSlice.reducer;
