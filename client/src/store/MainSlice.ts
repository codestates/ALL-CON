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
  /* 가운데 포스터의 인덱스*/
  targetIdx: number;
}

/* State 초기값 설정 */
const initialState: main = {
  order: 'hot',
  target: {},
  allConcerts: [],
  targetIdx: 0
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
    setTargetIdx: (state: main, { payload }: PayloadAction<number>) => {
      state.targetIdx = payload;
    },
    setAllConcerts: (state: main, { payload }: PayloadAction<Array<any>>) => {
      state.allConcerts = payload;
    }
  },
});

export const {
  setOrder,
  setTarget,
  setTargetIdx,
  setAllConcerts,
} = mainSlice.actions;
export default mainSlice.reducer;
