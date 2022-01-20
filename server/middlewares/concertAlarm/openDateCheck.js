const nodemailer = require('nodemailer');

const openDateCheck = async (targetOpenDate) => {

  let year = targetOpenDate.getUTCFullYear()
  let month = targetOpenDate.getUTCMonth()
  let date = targetOpenDate.getUTCDate()
  let hour = targetOpenDate.getUTCHours()
  let minute = targetOpenDate.getUTCMinutes()

  // console.log("-----------------------------openDateCheck함수--------------------------", targetOpenDate)
  // console.log("------------------------openDateCheck함수-----------------------", year, month+1, date, hour, minute)

  // 2022년 1월 9일
  let today = new Date()

  console.log('-------------------TODAY----------------------------', today)

  let yearToday = today.getFullYear()
  let monthToday = today.getMonth()
  let dateToday = today.getDate()
  let hourToday = today.getHours()

  // console.log("-------------openDateCheck함수-------------", today)
  // console.log("---------------openDateCheck함수---------", yearToday, monthToday+1, dateToday, hourToday, minuteToday)

  // 년 확인
  if(year !== yearToday) return false
  // 월 확인
  if(month !== monthToday) return false
  // 날짜 및 시간 확인
  if(date-1 === dateToday && hour === hourToday) return true
  else return false
  
}

module.exports = {
  openDateCheck
}