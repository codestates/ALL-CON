/* Library import */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
/* State Type 설정 */
export interface concertComments {
  /* pageNum */
  pageNum: number;
  totalNum: number;
  /* 현재 페이지 전체 댓글 목록 */
  pageAllComments: any[];
  comment: {
    id?: number;
    content?: string;
    user_id?: number;
    image?: string;
    concert_id?: number;
    createdAt?: Date;
    updatedAt?: Date;
  };
}

/* State 초기값 설정 */
const initialState: concertComments = {
  pageNum: 1,
  totalNum: 1,
  pageAllComments: [],
  comment: {}
};

const concertCommentsSlice = createSlice({
  name: 'concertComments',
  initialState: initialState,
  reducers: {
    /* Action 설정 */
    setPageNum: (state: concertComments, { payload }: PayloadAction<number>) => {
      state.pageNum = payload;
    },
    setTotalNum: (state: concertComments, { payload }: PayloadAction<number>) => {
      state.totalNum = payload;
    },
    setPageAllComments: (state: concertComments, { payload }: PayloadAction<Array<any>>) => {
      state.pageAllComments = payload;
    },
    setComment: (state: concertComments, { payload }: PayloadAction<object>) => {
      state.comment = payload;
    }
  },
});

export const {
  setPageNum,
  setTotalNum,
  setPageAllComments,
  setComment
} = concertCommentsSlice.actions;

export default concertCommentsSlice.reducer;
