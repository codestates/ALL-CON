const { Users, Alarms, Concerts } = require('../../models');
const { emailAlarm } = require('./emailAlarm');
const { phoneAlarm } = require('./phoneAlarm');
const { openDateCheck } = require('./openDateCheck');
const { SamplePage } = require('twilio/lib/rest/autopilot/v1/assistant/task/sample');

// 콘서트 티켓 오픈일 알라머
const concertAlarm = async () => {

  const alaramInfo = await Alarms.findAll()

  let emailAlarmInfo = []
  let phoneAlarmInfo = []

  for(let i = 0; i < alaramInfo.length; i++) {

    let userId = alaramInfo[i].dataValues.user_id
    let concertId = alaramInfo[i].dataValues.concert_id
    let concertInfo = await Concerts.findOne({ where: { id: concertId }})
    
    let userInfo = await Users.findOne({ where: { id: userId}})
    let concertLink = concertInfo.dataValues.link

    // 이메일 알람인 경우, 다음을 실행한다
    if(alaramInfo[i].dataValues.email_alarm) {
      // 각 콘서트의 openDate의 정보를 담는다
      emailAlarmInfo.push({
        user_id: userId,
        concert_id: concertId,
        email: userInfo.dataValues.email,
        title: concertInfo.dataValues.title,
        open_date: concertInfo.dataValues.open_date,
        image_concert: concertInfo.dataValues.image_concert,
        period: concertInfo.dataValues.period,
        place: concertInfo.dataValues.place,
        link: concertLink
      })
    } 
    else if(alaramInfo[i].dataValues.phone_alarm) {
      // 각 콘서트의 openDate의 정보를 담는다
      phoneAlarmInfo.push({
        user_id: userId,
        concert_id: concertId,
        phone_number: userInfo.dataValues.phone_number,
        title: concertInfo.dataValues.title,
        open_date: concertInfo.dataValues.open_date
      })
    }
  }

  // 이메일 알라머
  for(let i = 0; i < emailAlarmInfo.length; i++) {

    let targetOpenDate = emailAlarmInfo[i].open_date
    let alarmSwitch = await openDateCheck(targetOpenDate)

    // 알람스위치가 true이면 메일을 전송한다!
    if(alarmSwitch) {
      await emailAlarm(emailAlarmInfo[i])
    }
  }

  // 핸드폰 알라머
  for(let i = 0; i < phoneAlarmInfo.length; i++) {
   
    let targetOpenDate = phoneAlarmInfo[i].open_date
    let alarmSwitch = await openDateCheck(targetOpenDate)

    // 알람스위치가 true이면 문자메시지를 전송한다!
    if(alarmSwitch) {
      await phoneAlarm(phoneAlarmInfo[i])
    }
  }
}

module.exports = {
  concertAlarm
}