const { Users, Alarms, Concerts } = require('../../models');
const { openDateCheck } = require('./openDateCheck');

// 콘서트 티켓 오픈일 알라머
const concertCleaner = async () => {

  console.log('^^^^^^^^^^^^^^^ 콘서트 클리너 시작 ^^^^^^^^^^^^^^^^^^^')

  const concertInfo = await Concerts.findAll()

  for(let i = 0; i < concertInfo.length; i++) {
    // 콘서트가 activation인 상태이면, 티켓오픈일이 지났는지 확인한다
    if(concertInfo[i].activation) await openDateCheck(concertInfo[i].open_date, concertInfo[i].id)
  }

  console.log('^^^^^^^^^^^^^^^ 콘서트 클리너 종료 ^^^^^^^^^^^^^^^^^^^')
}

module.exports = {
  concertCleaner
}