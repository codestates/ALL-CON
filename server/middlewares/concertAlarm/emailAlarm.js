const { Users, Alarms, Concerts } = require('../../models');
const { ejsHtmlCaller } = require('../ejsHtmlCaller/ejsHtmlCaller')
const ejs = require('ejs');
const nodemailer = require('nodemailer');
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

  // 콘서트 알람 이메일 보내기
  await ejsHtmlCaller('concertAlarm', `${alarmInfo.email}`, {
    username,
    concertTitle,
    concertOpenDate,
    concertImageUrl,
    concertUrl,
    hotConcertList
  })

  // 이메일은 보낸 알람은 테이블에서 삭제
  // await Alarms.destroy({
  //   where: { 
  //     user_id: alarmInfo.user_id, 
  //     concert_id: alarmInfo.concert_id
  //   }
  // })
}

module.exports = {
  emailAlarm
}