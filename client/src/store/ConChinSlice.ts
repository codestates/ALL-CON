/* Library import */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
/* State Type 설정 */
export interface conChin {
  /*view,new,near - 콘서트 정렬 */
  postingOrder: string;
  /*view,new,near - 게시글 정렬 */
  articleOrder: string;
  /* 받아온 게시물 목록 */
  allArticles: any[];
  articleTotalPage: number;
  /* 선택한 게시물 */
  targetArticle: {
    concert_id?: number;
    content?: string;
    createdAt?: Date;
    id?: number;
    image?: string;
    member_count?: number;
    title?: string;
    total_comment?: number;
    total_member?: number;
    updatedAt?: Date;
    user_id?: number;
    view?: number;
  };
  /* 게시물 현재 페이지 */
  articleCurPage: number;
  /* 선택한 게시물 유저 정보 */
  targetArticlesUserInfo: {
    email?: string;
    username?: string;
    image?: string;
    introduction?: string;
    birth?: string;
    createdAt?: string;
  };
  /* 게시물 렌더 상태 */
  articleRendered?: boolean;
}

/* State 초기값 설정 */
const initialState: conChin = {
  postingOrder: 'view',
  articleOrder: 'view',
  allArticles: [],
  articleTotalPage: 0,
  targetArticle: {},
  targetArticlesUserInfo: {},
  articleCurPage: 0,
  articleRendered: false,
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
    setTargetArticlesUserInfo: (
      state: conChin,
      { payload }: PayloadAction<object>,
    ) => {
      state.targetArticlesUserInfo = payload;
    },
    setArticleCurPage: (state: conChin, { payload }: PayloadAction<number>) => {
      state.articleCurPage = payload;
    },
    setArticleRendered: (
      state: conChin,
      { payload }: PayloadAction<boolean>,
    ) => {
      state.articleRendered = payload;
    },
  },
});

export const {
  setPostingOrder,
  setArticleOrder,
  setAllArticles,
  setArticleTotalPage,
  setTargetArticle,
  setTargetArticlesUserInfo,
  setArticleCurPage,
  setArticleRendered,
} = conChinSlice.actions;
export default conChinSlice.reducer;
