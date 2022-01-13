/* Library import */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
/* State Type 설정 */
export interface main {
  /*hot,new,near */
  order: string;
  /*현재 선택된 포스터*/
  target: {
    exclusive?: string;
    open_date?: string;
    post_date?: string;
    image_concert?: string;
    title?: string;
    place?: string;
    view?: number;
  };
  /*실제 받아온 콘서트 목록들*/
  allConcerts: any[];
  /*들어오는 총 콘서트 목록(5개)*/
  fiveConcerts: any[];
  /*현재 화면에 보이고 있는 슬라이드의 시작점*/
  /*슬라이드 내부 컨텐츠 전체 길이*/
  /*타겟 인덱스*/
}

/* State 초기값 설정 */
const initialState: main = {
  order: 'hot',
  target: {},
  allConcerts: [],
  fiveConcerts: [],
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
  },
});

export const { setOrder, setTarget, setAllConcerts, setFiveConcerts } =
  mainSlice.actions;
export default mainSlice.reducer;
