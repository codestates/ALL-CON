/* Store import */
import { persistor } from '../index';
/* Library import */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { setTarget } from './MainSlice';

/* State Type 설정 */
export interface my {
  /* 자기소개 */
  myIntroductionState: boolean;
  myIntroduction: string;
  /* 자기소개 */
  commentBtnType: string;

  myArticleTotalPage: number;
  myConcertCommentTotalPage: number;
  myTotalConcertComment: number;
  myArticleCommentTotalPage: number;
  myTotalArticleComment: number;
  articleInfo: {
    id?: number;
    title?: string;
    content?: string;
    image?: string;
    total_comment?: number;
    member_count?: number;
    total_member?: number;
    view?: number;
    user_id?: number;
    concert_id?: number;
    createdAt?: Date;
    updatedAt?: Date;
  }
  concertCommentInfo: {
    Article?: object,
    id?: number;
    content?: string;
    user_id?: number;
    article_id?: number;
    createdAt?: Date;
    updatedAt?: Date;
  }
  articleCommentInfo: {
    Article?: object,
    id?: number;
    content?: string;
    user_id?: number;
    article_id?: number;
    createdAt?: Date;
    updatedAt?: Date;
  }
}
/* State 초기값 설정 */
const initialState: my = { 
  myIntroductionState: false, 
  myIntroduction: '', 
  commentBtnType: '콘서트',
  articleInfo: {}, 
  myArticleTotalPage: 0, 
  myConcertCommentTotalPage: 0, 
  myTotalConcertComment: 0, 
  concertCommentInfo: {},
  myArticleCommentTotalPage: 0,
  myTotalArticleComment: 0,
  articleCommentInfo: {}
};

const mySlice = createSlice({
  name: 'my',
  initialState: initialState,
  reducers: {
    /* Action 설정 */
    setMyIntroductionState: (state: my, { payload }: PayloadAction<boolean>) => { 
      state.myIntroductionState = payload;
    },
    getMyIntroduction: (state: my, { payload }: PayloadAction<string>) => { 
      state.myIntroduction = payload;
    },  
    getCommentBtnType: (state: my, { payload }: PayloadAction<string>) => { 
      state.commentBtnType = payload;
    },
    getMyArticleTotalPage: (state: my, { payload }: PayloadAction<number>) => { 
      state.myArticleTotalPage = payload;
    },    
    getMyTotalConcertComment: (state: my, { payload }: PayloadAction<number>) => { 
      state.myTotalConcertComment = payload;
    },  
    getMyConcertCommentTotalPage: (state: my, { payload }: PayloadAction<number>) => { 
      state.myConcertCommentTotalPage = payload;
    }, 
    getMyTotalArticleComment: (state: my, { payload }: PayloadAction<number>) => { 
      state.myTotalArticleComment = payload;
    },  
    getMyArticleCommentTotalPage: (state: my, { payload }: PayloadAction<number>) => { 
      state.myArticleCommentTotalPage = payload;
    }, 
    getArticleInfo: (state: my, { payload }: PayloadAction<my>) => { 
      state.articleInfo = payload.articleInfo;
    },
    getMyConcertCommentInfo: (state: my, { payload }: PayloadAction<my>) => { 
      state.concertCommentInfo = payload.concertCommentInfo;
    },  
    getMyArticleCommentInfo: (state: my, { payload }: PayloadAction<my>) => { 
      state.articleCommentInfo = payload.articleCommentInfo;
    }, 
  }
});

export const { 
  setMyIntroductionState, 
  getMyIntroduction, 

  getCommentBtnType,
  getArticleInfo, 
  getMyArticleTotalPage, 
  getMyConcertCommentTotalPage, 
  getMyTotalConcertComment,
  getMyConcertCommentInfo,
  getMyTotalArticleComment,
  getMyArticleCommentTotalPage,
  getMyArticleCommentInfo 
} = mySlice.actions;

export default mySlice.reducer;