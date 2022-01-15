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
  /*전체 콘서트 목록들 */
  allConcerts: any[];
  /*첫번째 포스터의 인덱스*/
  firstIdx: number;
  /*5개 콘서트 정보들*/
  firstConcert: {
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
  secondConcert: {
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
  thirdConcert: {
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
  fourthConcert: {
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
  fifthConcert: {
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
}

/* State 초기값 설정 */
const initialState: main = {
  order: 'hot',
  target: {},
  allConcerts: [],
  firstIdx: 0,
  firstConcert: {},
  secondConcert: {},
  thirdConcert: {},
  fourthConcert: {},
  fifthConcert: {},
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
    setTargetZero: (state: main) => {
      state.target = state.allConcerts[0];
    },
    setAllConcerts: (state: main, { payload }: PayloadAction<Array<any>>) => {
      state.allConcerts = payload;
    },
    setFirstIdx: (state: main, { payload }: PayloadAction<number>) => {
      state.firstIdx = payload;
    },
    makeFirstIdxZero: (state: main) => {
      state.firstIdx = 0;
    },
    addNumberToFirstIdx: (state: main) => {
      state.firstIdx = state.firstIdx + 1;
    },
    setFirstConcert: (state: main, { payload }: PayloadAction<object>) => {
      state.firstConcert = payload;
    },
    setSecondConcert: (state: main, { payload }: PayloadAction<object>) => {
      state.secondConcert = payload;
    },
    setThirdConcert: (state: main, { payload }: PayloadAction<object>) => {
      state.thirdConcert = payload;
    },
    setFourthConcert: (state: main, { payload }: PayloadAction<object>) => {
      state.fourthConcert = payload;
    },
    setFifthConcert: (state: main, { payload }: PayloadAction<object>) => {
      state.fifthConcert = payload;
    },
  },
});

export const {
  setOrder,
  setTarget,
  setTargetZero,
  setAllConcerts,
  setFirstIdx,
  makeFirstIdxZero,
  addNumberToFirstIdx,
  setFirstConcert,
  setSecondConcert,
  setThirdConcert,
  setFourthConcert,
  setFifthConcert,
} = mainSlice.actions;
export default mainSlice.reducer;
