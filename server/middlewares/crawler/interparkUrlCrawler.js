const { Concerts } = require('../../models');
const axios = require('axios');
const cheerio = require('cheerio');
const iconv = require('iconv-lite');
const sequelize = require("sequelize");
const Op = sequelize.Op;
iconv.skipDecodeWarning = true;

/* 티켓 오픈 공지 게시물 URL 크롤러 함수 */
const interparkUrlCrawler = async () => {
  let concertUrls = [];
  /* 인터파크 티켓 오픈 공지 URL */
  const url = 'https://ticket.interpark.com/webzine/paper/TPNoticeList_iFrame.asp?bbsno=34&stext=&KindOfGoods=TICKET&genre=&sort=WriteDate&pageno=1';
  const html = await axios.get(
    url, { responseType: 'arraybuffer' }
  ).catch(err => '');
  const htmlData = iconv.decode(html.data, 'euc-kr').toString();
  const $ = cheerio.load(htmlData);
  
  /* DB에 담긴 모든 interpark 콘서트 Url */ 
  const interparkDBUrl = await Concerts.findAll({
    attributes: ['link'],
    where: { link: { [Op.like]: '%interpark%' }}
  })
  /* 모든 Url값들중 글번호만 추출  */
  let urlNums = [];
  for(let i=0; i<interparkDBUrl.length; i++){
    urlNums.push(Number(interparkDBUrl[i].link.split('&')[3].substring(3)));
  }
  /* urlNums 배열중 가장 큰 글번호만 추출(lastUrlNum)  */
  const lastUrlNum = urlNums.length>0 ? Math.max.apply(null, urlNums) : 0;
  
  /* 티켓 오픈 공지 1page 게시물 18개 */
  for(let i=0; i<18; i++){
    const concertList = $('.table table tbody tr')[i];
    const type = String($(concertList).find('.type').text());
    
    /* type이 콘서트인 게시물의 URL만 간추려서 크롤링한다 */
    if(type === '콘서트'){ 
      const concertUrl = String($(concertList).find('.subject a').attr('href')); 
      const concertUrlNum = concertUrl ? concertUrl.split('&')[3].substring(3) : 0;
      
      /* concertUrlNum이 lastUrlNum 보다 큰경우 (즉 기존 DB에 없는 최신 콘서트 정보인 경우에만 크롤링) */
      if(concertUrlNum > lastUrlNum) concertUrls.push(`https://ticket.interpark.com/webzine/paper/${concertUrl}`);
    }
  }
  return concertUrls;
}

module.exports = {
  interparkUrlCrawler
}