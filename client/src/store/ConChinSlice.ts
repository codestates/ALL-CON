/* Library import */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
/* State Type 설정 */
export interface conChin {
  /*hot,new,near */
  postingOrder: string;
  articleOrder: string;
  /* 받아온 게시물 목록 */
  allArticles: any[];
  articleTotalPage: number;
  targetArticle: {
    concert_id?: number;
    id?: number;
    createdAt?: Date;
    content?: string;
    exclusive?: string;
    open_date?: Date;
    post_date?: string;
    image_concert?: string;
    title?: string;
    period?: string;
    place?: string;
    price?: string;
    running_time?: string;
    rating?: string;
    link?: string;
    view?: number;
    total_comment?: number;
    updatedAt?: Date;
  };
}

/* State 초기값 설정 */
const initialState: conChin = {
  postingOrder: 'view',
  articleOrder: 'view',
  allArticles: [],
  articleTotalPage: 0,
  targetArticle: {},
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
    setArticleTotalPage: (
      state: conChin,
      { payload }: PayloadAction<number>,
    ) => {
      state.articleTotalPage = payload;
    },
    setTargetArticle: (state: conChin, { payload }: PayloadAction<object>) => {
      state.targetArticle = payload;
    },
  },
});

export const {
  setPostingOrder,
  setArticleOrder,
  setAllArticles,
  setArticleTotalPage,
  setTargetArticle,
} = conChinSlice.actions;
export default conChinSlice.reducer;
