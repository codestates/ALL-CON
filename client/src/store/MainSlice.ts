/* Library import */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
/* State Type 설정 */
export interface main {
  /* view, new, near */
  order: string;
  /* 현재 선택된 포스터 */
  target: {
    id?: number;
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
    createdAt?: Date;
    updatedAt?: Date;
  };
  /* 실제 받아온 콘서트 목록들 */
  allConcerts: any[];
  /*들어오는 총 콘서트 목록(5개)*/
  fiveConcerts: any[];
  /*allConcerts에서 firstConcert(=fiveConcerts[0])의 인덱스*/
  firstIdx: number;
  /*현재 화면에 보이고 있는 슬라이드의 시작점*/
  /*슬라이드 내부 컨텐츠 전체 길이*/
}

/* State 초기값 설정 */
const initialState: main = {
  order: 'hot',
  target: {},
  allConcerts: [],
  fiveConcerts: [],
  firstIdx: 0,
};

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
    setAllConcerts: (state: main, { payload }: PayloadAction<Array<any>>) => {
      state.allConcerts = payload;
    },
    setFiveConcerts: (state: main, { payload }: PayloadAction<Array<any>>) => {
      state.fiveConcerts = payload;
    },
    setFirstIdx: (state: main, { payload }: PayloadAction<number>) => {
      state.firstIdx = payload;
    },
    addNumberToFirstIdx: (state: main) => {
      state.firstIdx = state.firstIdx + 1;
    },
  },
});

export const {
  setOrder,
  setTarget,
  setAllConcerts,
  setFiveConcerts,
  setFirstIdx,
  addNumberToFirstIdx,
} = mainSlice.actions;
export default mainSlice.reducer;
