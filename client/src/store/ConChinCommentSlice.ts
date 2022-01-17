/* Library import */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
/* State Type 설정 */
export interface conChinComments {
  /* pageNum */
  conChinPageNum: number;
  conChinTotalNum: number;
  /* 현재 페이지 전체 댓글 목록 */
  conChinPageAllComments: any[];
  conChinComment: {
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
const initialState: conChinComments = {
  conChinPageNum: 1,
  conChinTotalNum: 1,
  conChinPageAllComments: [],
  conChinComment: {},
};

const conChinCommentsSlice = createSlice({
  name: 'conChinComments',
  initialState: initialState,
  reducers: {
    /* Action 설정 */
    setConChinPageNum: (
      state: conChinComments,
      { payload }: PayloadAction<number>,
    ) => {
      state.conChinPageNum = payload;
    },
    setConChinTotalNum: (
      state: conChinComments,
      { payload }: PayloadAction<number>,
    ) => {
      state.conChinTotalNum = payload;
    },
    setConChinPageAllComments: (
      state: conChinComments,
      { payload }: PayloadAction<Array<any>>,
    ) => {
      state.conChinPageAllComments = payload;
    },
    setConChinComment: (
      state: conChinComments,
      { payload }: PayloadAction<object>,
    ) => {
      state.conChinComment = payload;
    },
  },
});

export const {
  setConChinPageNum,
  setConChinTotalNum,
  setConChinPageAllComments,
  setConChinComment,
} = conChinCommentsSlice.actions;

export default conChinCommentsSlice.reducer;
