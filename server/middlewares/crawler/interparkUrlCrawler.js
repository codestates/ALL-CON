const axios = require('axios');
const cheerio = require('cheerio');
const iconv = require('iconv-lite');
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
  
  /* 티켓 오픈 공지 1page 게시물 18개 */
  for(let i=0; i<18; i++){
    const concertList = $('.table table tbody tr')[i];
    const type = String($(concertList).find('.type').text());
    
    /* type이 콘서트인 게시물의 URL만 간추려서 크롤링한다 */
    if(type === '콘서트'){ 
      const concertUrl = String($(concertList).find('.subject a').attr('href')); 
      concertUrls.push(`https://ticket.interpark.com/webzine/paper/${concertUrl}`);
    }
  }

  return concertUrls;
}

module.exports = {
  interparkUrlCrawler
}