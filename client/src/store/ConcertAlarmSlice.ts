/* Library import */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
/* State Type 설정 */
export interface concertAlarm {
  /* 이메일 알람 클릭 여부 상태 */
  emailClick: boolean;
  /* 문자 알람 클릭 여부 상태 */
  smsClick: boolean;
  /* 모든 알람 목록 상태 */
  allAlarms: any[];
  /* 알람 정보 */
  alarm: {
    id?: number;
    email_alarm?: boolean;
    phone_alarm?: boolean;
    user_id?: number;
    concert_id?: number;
    createdAt?: Date;
    updatedAt?: Date;
  };
}

/* State 초기값 설정 */
const initialState: concertAlarm = {
  emailClick: false,
  smsClick: false,
  allAlarms: [],
  alarm: {}
};

const concertAlarmSlice = createSlice({
  name: 'concertAlarm',
  initialState: initialState,
  reducers: {
    /* Action 설정 */
    setEmailClick: (state: concertAlarm, { payload }: PayloadAction<boolean>) => {
      state.emailClick = payload;
    },
    setSmsClick: (state: concertAlarm, { payload }: PayloadAction<boolean>) => {
      state.emailClick = payload;
    },
    setAlarm: (state: concertAlarm, { payload }: PayloadAction<object>) => {
      state.alarm = payload;
    },
    setAllAlarms: (state: concertAlarm, { payload }: PayloadAction<Array<any>>) => {
      state.allAlarms = payload;
    }
  },
});

export const {
  setEmailClick,
  setSmsClick,
  setAlarm,
  setAllAlarms
} = concertAlarmSlice.actions;
export default concertAlarmSlice.reducer;
