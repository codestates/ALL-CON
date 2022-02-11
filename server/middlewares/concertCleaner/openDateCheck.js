const { Concerts, Articles } = require('../../models');

const openDateCheck = async (targetOpenDate, concertid) => {
  
  // 콘서트 오픈일 날짜 (년, 월, 일)
  let year = targetOpenDate.getUTCFullYear()
  let month = targetOpenDate.getUTCMonth()
  let date = targetOpenDate.getUTCDate()

  // 오늘 날짜 (년, 월, 일)
  let today = new Date()

  let yearToday = today.getFullYear()
  let monthToday = today.getMonth()
  let dateToday = today.getDate()

  // 날짜 확인
  // 콘서트 오픈일 (년)이 오늘 (년)보다 작고, 다음을 실행한다
  if(year < yearToday) {
    // 콘서트 오픈일 (월)이 12월이고 오늘 (월)이 1월이거나,
    // 콘서트 오픈일 (월)+1이 오늘 (월)보다 작거나 같으면, 다음을 실행한다
    if((month === 12 && monthToday === 1) || (month+1 <= monthToday)) {
      // 콘서트 오픈일 (일)이 오늘 (일)보다 작거나 같으면, 다음을 실행한다
      if(date <= dateToday) {
        // 해당 콘서트의 activation을 false로 바꿔준다!
        await Concerts.update(
          { activation: false },
          { where: { id: concertid } }
        )
        // 해당 콘서트 모든 게시글의 조회수를 음수처리 한다!
        const articleInfo = await Articles.findAll({ where: { concert_id: concertid } })
        
        for(let i = 0; i < articleInfo.length; i++) {
          let articleid = articleInfo[i].id
          
          await Articles.update(
            { view: -999999 },
            { where: { id: articleid } }
          )
        }
      }
    }
  } 
  // 콘서트 오픈일 (년)과 오늘 (년)이 일치하면, 다음을 실행한다
  else if(year === yearToday) {
    if(month+1 <= monthToday && date <= dateToday) {
      // 해당 콘서트의 activation을 false로 바꿔준다!
      await Concerts.update(
        { activation: false },
        { where: { id: concertid } }
      )
      // 해당 콘서트 모든 게시글의 조회수를 음수처리 한다!
      const articleInfo = await Articles.findAll({ where: { concert_id: concertid } })
      
      for(let i = 0; i < articleInfo.length; i++) {
        let articleid = articleInfo[i].id
        
        await Articles.update(
          { view: -999999 },
          { where: { id: articleid } }
        )
      }
    }
  }
  
  return
}

module.exports = {
  openDateCheck
}