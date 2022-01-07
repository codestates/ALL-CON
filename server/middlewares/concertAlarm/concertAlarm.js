const { Users, Alarms, Concerts } = require('../../models');
const { emailAlarm } = require('./emailAlarm');
const { openDateCheck } = require('./openDateCheck');

// 콘서트 티켓 오픈일 알라머
const concertAlarm = async () => {

  const alaramInfo = await Alarms.findAll()

  let selectAlarmInfo = []

  for(let i = 0; i < alaramInfo.length; i++) {

    let userId = alaramInfo[i].dataValues.user_id
    let concertId = alaramInfo[i].dataValues.concert_id
    let concertInfo = await Concerts.findOne({ where: { id: concertId }})
    
    let userInfo = await Users.findOne({ where: { id: userId}})

    // 각 콘서트의 openDate의 정보를 담는다
    selectAlarmInfo.push({
      user_id: userId,
      concert_id: concertId,
      email: userInfo.dataValues.email,
      title: concertInfo.dataValues.title,
      open_date: concertInfo.dataValues.open_date,
      image_concert: concertInfo.dataValues.image_concert,
      period: concertInfo.dataValues.period,
      place: concertInfo.dataValues.place
    })
  }

  console.log(' ------ selectAlarmInfo ----------- ', selectAlarmInfo)

  for(let i = 0; i < selectAlarmInfo.length; i++) {
    let targetOpenDate = selectAlarmInfo[i].open_date

    let alarmSwitch = await openDateCheck(targetOpenDate)

    // 알람스위치가 true이면 메일을 전송한다!
    if(alarmSwitch) {
      await emailAlarm(selectAlarmInfo[i])
      console.log(" ------------이메일 전송 완료----------------")
    }
  }

}

module.exports = {
  concertAlarm
}