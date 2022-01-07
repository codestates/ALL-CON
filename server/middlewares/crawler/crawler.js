const { interparkCrawler } = require('./interparkCrawler');
const { yes24Crawler } = require('./yes24Crawler');
const { Concerts } = require('../../models');

/* 티켓 오픈 공지 게시물 클릭 후 내용 크롤러 함수 */
const crawler = async () => {

  console.log(" --- crawler 함수화 테스트 --- ")
  let interData = await interparkCrawler();
  let yesData = await yes24Crawler()
  
  const concerts = []
  
  // 먼저 인터파크 데이터는 다 받는다
  for(let i = 0; i < interData.length; i++) {
    concerts.push(interData[i])
  }
  
  // YES24 데이터는 제목 중복여부를 판단하여 넣어준다
  for(let i = 0; i < yesData.length; i++) {
    // i번째 YES24 콘서트의 제목에서 띄어쓰기 부분을 모두 제거: ex) '하나 둘 셋' => '하나둘셋'
    let newYesTitle = yesData[i].title.replace(/\s/g, '');
    
    // title에 '티켓오픈안내' 문자가 들어가면 제거해준다
    if(newYesTitle.indexOf('티켓오픈안내')) newYesTitle = newYesTitle.replace('티켓오픈안내', '');
    
    for(let j = 0; j < concerts.length; j++) {
      // j번째 인터파크 콘서트의 제목에서 띄어쓰기 부분을 모두 제거
      let newInterTitle = concerts[j].title.replace(/\s/g, '');
      // 만약 j번째
      if(j === concerts.length - 1 && newYesTitle !== newInterTitle) concerts.push(yesData[i]);
      else if(newYesTitle === newInterTitle) break;
    }
  }
  
  // DB에 쌓아준다
  for(let i = 0; i < concerts.length; i++) {
    await Concerts.create({ 
      exclusive: concerts[i].exclusive,
      open_date: concerts[i].open_date,
      post_date: concerts[i].post_date,
      image_concert: concerts[i].image_concert,
      title: concerts[i].title,
      show_schedule: concerts[i].show_schedule,
      place: concerts[i].place,
      price: concerts[i].price,
      running_time: concerts[i].runnig_time,
      rating: concerts[i].rating,
      link: concerts[i].link,
      view: 0,
      total_comment: 0
    });
  }
}

module.exports = {
  crawler
}