const nodemailer = require('nodemailer');
const { Users, Alarms, Concerts } = require('../../models');
const ejs = require('ejs');
const fs = require('fs');
require('dotenv').config();

const emailAlarm = async (alarmInfo) => {

  const newConcert = await Concerts.findAll({ 
    limit: 6,
    order: [['view', 'DESC']]
  })

  let hotConcertList = []

  for(let i = 0; i < newConcert.length; i++) {
    hotConcertList.push(newConcert[i].dataValues)
  }

  const userInfo = await Users.findOne({ id: alarmInfo.user_id })

  const username = userInfo.username;
  const concertTitle = alarmInfo.title
  const concertOpenDateRawData = alarmInfo.open_date;
  const concertImageUrl = alarmInfo.image_concert
  const concertUrl = alarmInfo.link

  const allconLogo = 'https://allcon-image-bucket.s3.ap-northeast-2.amazonaws.com/allConLogo.png';
  const youtubeLogo = `https://allcon-image-bucket.s3.ap-northeast-2.amazonaws.com/youtubeLogo.png`;
  const instaLogo = 'https://allcon-image-bucket.s3.ap-northeast-2.amazonaws.com/instaLogo.png';

  let year = concertOpenDateRawData.getFullYear()
  let month = concertOpenDateRawData.getMonth() + 1;
  let date = concertOpenDateRawData.getDate()
  let hour = concertOpenDateRawData.getHours()
  let minute = concertOpenDateRawData.getMinutes()

  let day = concertOpenDateRawData.getDay()

  /* 날짜 변환 */
  if(day === 0) day = '일요일'
  else if(day === 1) day = '월요일'
  else if(day === 2) day = '화요일'
  else if(day === 3) day = '수요일'
  else if(day === 4) day = '목요일'
  else if(day === 5) day = '금요일'
  else if(day === 6) day = '토요일'
    
  let concertOpenDate = ''

  if(minute === 0) concertOpenDate = `${year}.${month}.${date} ${hour}:00 ${day}`
  else concertOpenDate = `${year}.${month}.${date} ${hour}:${minute} ${day}`
  /* 날짜 변환 */

  // 송신 이메일 설정
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    auth: {
      user: `${process.env.EMAIL_ID}`,
      pass: `${process.env.EMAIL_PASS}`
    }
  })

  // ejs 파일에서 html 받아오기
  let emailAlarmHtml;
  ejs.renderFile(
    __dirname + '/../ejsform/emailAlarm.ejs',
    {
      username,
      concertTitle,
      concertOpenDate,
      concertImageUrl,
      concertUrl,
      allconLogo,
      youtubeLogo,
      instaLogo,
      hotConcertList
    },
    (err, data) => {
      if(err) console.log(err);
      emailAlarmHtml = data;
    }
  )

  // 메일 보내는 content 작성
  var mailOptions = {
    from: `<${process.env.EMAIL_ID}>`,
    to: `${alarmInfo.email}`,
    subject: `🔔[All-Con] 콘서트 티켓오픈일 알림 - ${alarmInfo.title}`,
    text: `${alarmInfo.title}의 티켓오픈일은 ${alarmInfo.open_date} 입니다!`,
    html: emailAlarmHtml,
  };

  // 메일 보내기
  await transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return console.log(error);
    }
    console.log('Message sent: %s', info.messageId);
  });

  // 이메일은 보낸 알람은 테이블에서 삭제
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