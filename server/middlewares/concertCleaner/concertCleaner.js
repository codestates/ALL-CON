const { Concerts } = require('../../models');
const { openDateCheck } = require('./openDateCheck');

// 콘서트 티켓 오픈일 알라머
const concertCleaner = async () => {
  // 현재 콘서트 DB에서 활성화된(activation: true) 콘서트만 불러온다
  const concertInfo = await Concerts.findAll({ where: { activation: true }})

  for(let i = 0; i < concertInfo.length; i++) {
    // 콘서트 티켓오픈일이 지났는지 확인한다
    await openDateCheck(concertInfo[i].open_date, concertInfo[i].id)
  }
}

module.exports = {
  concertCleaner
}