const { interparkUrlCrawler } = require('./interparkUrlCrawler');
const { openDateFormatter } = require('./openDateFormatter');
const axios = require('axios');
const cheerio = require('cheerio');
const iconv = require('iconv-lite');
iconv.skipDecodeWarning = true;

/* 티켓 오픈 공지 게시물 클릭 후 내용 크롤러 함수 */
const interparkCrawler = async () => {
  let concertsDB = [];
  /* 티켓 오픈 공지 게시물 URL 배열을 가져와 배열을 순회하며 반복적으로 크롤링한다 */
  const url = await interparkUrlCrawler();
  /* URL 배열의 길이 만큼 반복 수행 */
  for(let i=0; i<url.length; i++){
    const html = await axios.get(
      url[i], { responseType: 'arraybuffer' }
    ).catch(err => '');
    const htmlData = iconv.decode(html.data, 'euc-kr').toString();
    const $ = cheerio.load(htmlData);
    
    /* DB 전처리 시작 */
    let exclusive = '';
    let open_date = '';
    let post_date = '';
    let image_concert = '';
    let title = '';
    let show_schedule = '';
    let place = '';
    let price = '';
    let runnig_time = '';
    let rating = '';
    let body = $('.introduce div p:nth-of-type(1)').find('br');

    exclusive = String($('.info h3').find('span').text().trim());
    open_date = String($('.open').text().substring(5).trim());
    post_date = String($('.date').find('span').text().trim());
    image_concert = String($('.poster').find('img').attr('src').trim());
    title = String($('.comment').find('p').text().trim());

    console.log(" ---------- open_date: 확인 ---------- ", open_date)
    
    if(body.length > 0){
      for(let i=0; i<body.length-1; i++){
        if(body[i].nextSibling.nodeValue){
          if(body[i].nextSibling.nodeValue.includes('일시')){
            const arr = body[i].nextSibling.nodeValue.split(':');
            if(arr.length > 1) show_schedule = body[i].nextSibling.nodeValue.split(':')[1].trim();
          } else if(body[i].nextSibling.nodeValue.includes('장소')){
            const arr = body[i].nextSibling.nodeValue.split(':');
            if(arr.length > 1) place = body[i].nextSibling.nodeValue.split(':')[1].trim();
          } else if(body[i].nextSibling.nodeValue.includes('가격') || body[i].nextSibling.nodeValue.includes('금액')){
            const arr = body[i].nextSibling.nodeValue.split(':');
            if(arr.length > 1) price = body[i].nextSibling.nodeValue.split(':')[1].trim();
          } else if(body[i].nextSibling.nodeValue.includes('러닝')){
            const arr = body[i].nextSibling.nodeValue.split(':');
            if(arr.length > 1) runnig_time = body[i].nextSibling.nodeValue.split(':')[1].trim();
          } else if(body[i].nextSibling.nodeValue.includes('등급') || body[i].nextSibling.nodeValue.includes('연령')){
            const arr = body[i].nextSibling.nodeValue.split(':');
            if(arr.length > 1) rating = body[i].nextSibling.nodeValue.split(':')[1].trim();
          }
        }
      }  
    }
    /* DB 전처리 끝 */
    /* DB Format 작성 */
    const concertDB = {
      'exclusive': exclusive.includes('단독판매') ? '인터파크' : '',
      'open_date': openDateFormatter(open_date),
      'post_date': post_date,
      'image_concert': image_concert,
      'title': title.substring(18, title.length-11).trim(),
      'place': place,
      'price': price,
      'runnig_time': runnig_time,
      'rating': rating,
      'link': url[i]
    }
    /* Format push */
    concertsDB.push(concertDB);
  }
  
  console.log(concertsDB);
  return concertsDB;
}

module.exports = {
  interparkCrawler
}