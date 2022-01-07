const nodemailer = require('nodemailer');
const { Alarms } = require('../../models');
require('dotenv').config();

const emailAlarm = async (alarmInfo) => {

  console.log("********************* emailAlarm 확인!!! ********************", alarmInfo)
  // 송신 이메일 설정
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    auth: {
      user: `${process.env.GOOGLE_EMAIL}`,
      pass: `${process.env.GOOGLE_PASSWORD}`
    }
  })

  // 송신 이메일 포맷 및 내용 설정
  const info = await transporter.sendMail({
    from: `<${process.env.GOOGLE_EMAIL}>`,
    to: `${alarmInfo.email}`,
    subject: `[All-Con] 콘서트 티켓오픈일 알림 - ${alarmInfo.title}`,
    text: `${alarmInfo.title}의 티켓오픈일은 ${alarmInfo.open_date} 입니다!`
  })

  await Alarms.destroy({
    where: { 
      user_id: alarmInfo.user_id, 
      concert_id: alarmInfo.concert_id
    }
  })
}

module.exports = {
  emailAlarm
}