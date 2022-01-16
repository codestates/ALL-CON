/* Store import */
import { persistor } from '../index';
/* Library import */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { setTarget } from './MainSlice';

/* State Type 설정 */
export interface my {
  myArticleTotalPage: number;
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
  // commentInfo: {

  // }
}
/* State 초기값 설정 */
const initialState: my = { articleInfo: {}, myArticleTotalPage: 0 };

const mySlice = createSlice({
  name: 'my',
  initialState: initialState,
  reducers: {
    /* Action 설정 */
    getMyArticleTotalPage: (state: my, { payload }: PayloadAction<number>) => { 
      state.myArticleTotalPage = payload;
    },    
    getArticleInfo: (state: my, { payload }: PayloadAction<my>) => { 
      state.articleInfo = payload.articleInfo;
    }
  }
});

export const {  getArticleInfo, getMyArticleTotalPage } = mySlice.actions;
export default mySlice.reducer;