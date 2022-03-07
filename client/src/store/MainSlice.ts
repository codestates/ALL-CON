/* Library import */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
/* State Type 설정 */
export interface main {
  /* view, new, near */
  order: string;
  /* 콘서트 목록중 현재 선택된 포스터(간략한 정보) */
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
    activation?: boolean;
  };
  /* 현재 선택된 포스터 상세정보 */
  detail: {
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
  /* 첫 렌더링 여부 상태 */
  isRendering: boolean;
  /* 콘서트 페이지 이동 여부 상태 */
  passToConcert: boolean;
  /* 댓글 총 개수 */
  mainTotalComments: number;
  /* 마지막 인덱스 */
  mainLastIdx: number;
  /* order 클릭 */
  isOrderClicked?: boolean;
  /* poster 로딩 */
  posterLoading?: boolean;
  /* mainPage 로딩 */
  mainLoading?: boolean;
  isMainVisited?: boolean;
}

/* State 초기값 설정 */
const initialState: main = {
  order: 'view',
  target: {},
  detail: {},
  allConcerts: [],
  targetIdx: 0,
  isRendering: false,
  passToConcert: false,
  mainTotalComments: 0,
  mainLastIdx: 0,
  isOrderClicked: false,
  posterLoading: false,
  mainLoading: true,
  isMainVisited: false,
};

const mainSlice = createSlice({
  name: 'main',
  initialState: initialState,
  reducers: {
    /* Action 설정 */
    setOrder: (state: main, { payload }: PayloadAction<string>) => {
      state.order = payload;
    },
    setAllConcerts: (state: main, { payload }: PayloadAction<Array<any>>) => {
      state.allConcerts = payload;
    },
    setTarget: (state: main, { payload }: PayloadAction<object>) => {
      state.target = payload;
    },
    setDetail: (state: main, { payload }: PayloadAction<object>) => {
      state.detail = payload;
    },
    setTargetIdx: (state: main, { payload }: PayloadAction<number>) => {
      state.targetIdx = payload;
    },
    setIsRendering: (state: main, { payload }: PayloadAction<boolean>) => {
      state.isRendering = payload;
    },
    setPassToConcert: (state: main, { payload }: PayloadAction<boolean>) => {
      state.passToConcert = payload;
    },
    setMainTotalComments: (state: main, { payload }: PayloadAction<number>) => {
      state.mainTotalComments = payload;
    },
    setMainLastIdx: (state: main, { payload }: PayloadAction<number>) => {
      state.mainLastIdx = payload;
    },
    setIsOrderClicked: (state: main, { payload }: PayloadAction<boolean>) => {
      state.isOrderClicked = payload;
    },
    setPosterLoading: (state: main, { payload }: PayloadAction<boolean>) => {
      state.posterLoading = payload;
    },
    setMainLoading: (state: main, { payload }: PayloadAction<boolean>) => {
      state.mainLoading = payload;
    },
    setisMainVisited: (state: main, { payload }: PayloadAction<boolean>) => {
      state.isMainVisited = payload;
    },
  },
});

export const {
  setOrder,
  setTarget,
  setTargetIdx,
  setDetail,
  setAllConcerts,
  setIsRendering,
  setPassToConcert,
  setMainTotalComments,
  setMainLastIdx,
  setIsOrderClicked,
  setPosterLoading,
  setMainLoading,
  setisMainVisited,
} = mainSlice.actions;
export default mainSlice.reducer;
