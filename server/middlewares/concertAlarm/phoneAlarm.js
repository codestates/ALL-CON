require('dotenv').config();
const { Alarms } = require('../../models');
const twilio = require("twilio")(process.env.TWILIO_SID, process.env.TWILIO_TOKEN);

const phoneAlarm = async (alarmInfo) => {

  // 인증번호 발송
  twilio.messages.create({
    from: process.env.TWILIO_PHONE,
    to: `+82${Number(alarmInfo.phone_number)}`,
    body: `[ALL-CON] [${alarmInfo.title}] 티켓 오픈일 하루전입니다.`,
  }); 

  // 문자메시지를 보낸 알람은 테이블에서 삭제
  await Alarms.destroy({
    where: { 
      user_id: alarmInfo.user_id, 
      concert_id: alarmInfo.concert_id
    }
  })
}

module.exports = {
  phoneAlarm
}