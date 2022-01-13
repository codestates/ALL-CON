const { Concerts } = require('../../models');
const { Capabilities, Builder, By, Key, until } = require('selenium-webdriver');
const { openDateFormatterYes } = require('./openDateFormatterYes');
const caps = new Capabilities();
caps.setPageLoadStrategy("eager");
const chrome = require("selenium-webdriver/chrome");
const opts = new chrome.Options();
// 크롬창이 켜지지 않는 옵션
opts.addArguments('headless');
opts.addArguments('window-size=1400, 1500')
opts.addArguments('--disable-gpu');
opts.addArguments('--no-sandbox')
opts.addArguments("start-maximized")
opts.addArguments("enable-automation")
opts.addArguments("--disable-infobars")
opts.addArguments("--disable-dev-shm-usage")
// sequelize 옵션
const sequelize = require("sequelize");
const Op = sequelize.Op;

/* 티켓 오픈 공지 게시물 URL 크롤러 함수 */
const yes24Crawler = async () => {
  
  let url = '';
  let concertList = [];

  /* DB에 담긴 모든 yes24 콘서트 Url */ 
  const yes24DBUrl = await Concerts.findAll({
    attributes: ['link'],
    where: { link: { [Op.like]: '%yes24%' }}
  })
  
  /* 모든 Url값들중 글번호만 추출  */
  let urlNums = [];
  for(let i = 0; i < yes24DBUrl.length; i++){
    urlNums.push(Number(yes24DBUrl[i].link.split('#id=')[1]));
  }

  /* urlNums 배열중 가장 큰 글번호만 추출(lastUrlNum)  */
  const lastUrlNum = urlNums.length > 0 ? Math.max.apply(null, urlNums) : 0;

  let driver = await new Builder().
  withCapabilities(caps).
  forBrowser('chrome').
  setChromeOptions(opts).
  build();
  try {
    let pageNum = 1
    let trNum = 2
    // yes24 티켓오픈 공지사항 페이지
    let address = `http://ticket.yes24.com/New/Notice/NoticeMain.aspx?Gcode=009_215#page=${pageNum}`;
    
    // YES24를 띄운다 (크롤링 준비 끝!)
    await driver.get(address); 
    await driver.sleep(20000);
    
    //  ----------------- 게시물 id별로 조회 시작! ----------------- 
    do {     
      // 상세 address를 딴다
      let head = `//*[@id="BoardList"]/div/table/tbody/`
      let tail = `tr[${trNum}]/td[2]/a`
      let path = head + tail
      
      let result = await driver.findElements(By.xpath(path));
      
      if(result.length !== 0) {
        url = await result[0].getAttribute('href');
      } else {
        console.log('url 없습니다!')
        break;
      }
      
      // if(url) {
        let baseUrl = address;
        let addition = '#id=';
        let extractId = url.split('#id=')[1];
        
        let num = Number(extractId);
        let str = num.toString();
        let targetUrl = `'` + `${baseUrl}` + `${addition}` + `${str}` + `'`;
          
        // 탭을 연다
        await driver.executeScript(`window.open(${targetUrl})`);
        let windows = await driver.getAllWindowHandles();
        
        // 해당 탭으로 이동
        await driver.switchTo().window(windows[windows.length-1]);
        await driver.sleep(10000*1.5);
        
        let subResult = await driver.findElements(By.className('noti-vt-tit'));
        
        // 배열 subResult에 요소가 담겨있지 않은 경우는 skip
        if(subResult.length !== 0) {
          let title = await subResult[0].getText();
          let exclusive = '';
          // 제목 앞에 '단독판매' 문구가 있으면 변수 eclusive에 'YES24'를 할당, 없으면 null
          if(title.indexOf('단독판매') !== -1) {
            exclusive = 'YES24';
            title = title.split('단독판매')[1] 
          };
          // 만약 "제목"에 콘서트가 포함되어있으면,
          if(title.indexOf('콘서트') !== -1 || title.indexOf('CONCERT') !== -1) {
            // 게시물 등록일
            let dateResult = await driver.findElements(By.className('noti-view-date'));
            let date = await dateResult[0].getText();
            // 게시물 조회수
            let inputDate = date.substring(6,16);
            // 조회수에서 ','를 제거
            let inputView = date.substring(22).replace(',', '');
            // 티켓오픈일
            let ticketOpenResult = await driver.findElements(By.id('title1'));
            let ticketOpen = await ticketOpenResult[0].getText();
            // 공연 개요
            let concertInfoResult = await driver.findElements(By.className('noti-view-comen-txt'));
            let concertInfo = await concertInfoResult[0].getText();
            
            // 각 콘서트 객체 값, 초기화 (공연개요)
            let inputTitle = '';
            let inputPeriod = [];
            let inputShow_schedule = '';
            let inputPlace = '';
            let inputPrice = '';
            let inputRunningTime = '';
            let inputRating = '';
                
            let concertInfoModi = concertInfo.split('\n');
                
            for(let i = 0; i < concertInfoModi.length; i++) {
              // 공연 제목 (title)
              if(concertInfoModi[i].indexOf('제목') !== -1|| concertInfoModi[i].indexOf('공 연 명') !== -1 || concertInfoModi[i].indexOf('공연명') !== -1) {
                if(concertInfoModi[i].indexOf('제목 : ') !== -1) inputTitle = concertInfoModi[i].split('제목 : ')[1];
                else if(concertInfoModi[i].indexOf('제목: ') !== -1) inputTitle = concertInfoModi[i].split('제목: ')[1];
                else if(concertInfoModi[i].indexOf('제목:') !== -1) inputTitle = concertInfoModi[i].split('제목:')[1];
                else if(concertInfoModi[i].indexOf('공연명 : ') !== -1) inputTitle = concertInfoModi[i].split('공연명 : ')[1];
                else if(concertInfoModi[i].indexOf('공연명: ') !== -1) inputTitle = concertInfoModi[i].split('공연명: ')[1];
                else if(concertInfoModi[i].indexOf('공연명:') !== -1) inputTitle = concertInfoModi[i].split('공연명:')[1];
                else if(concertInfoModi[i].indexOf('공 연 명 : ') !== -1) inputTitle = concertInfoModi[i].split('공 연 명 : ')[1];
                else if(concertInfoModi[i].indexOf('공 연 명: ') !== -1) inputTitle = concertInfoModi[i].split('공 연 명: ')[1];
                else if(concertInfoModi[i].indexOf('공 연 명:') !== -1) inputTitle = concertInfoModi[i].split('공 연 명:')[1];
              } 
              // 공연 기간 (period)
              else if(concertInfoModi[i].indexOf('기간') !== -1|| concertInfoModi[i].indexOf('일자') !== -1 ||  concertInfoModi[i].indexOf('일시') !== -1 || (concertInfoModi[i].indexOf('년') !== -1 && concertInfoModi[i].indexOf('월') !== -1)) {
                // '티켓'이란 단어가 없어야 한다
                if(concertInfoModi[i].indexOf('티켓') === -1 && concertInfoModi[i].indexOf('시간') === -1 && concertInfoModi[i].indexOf('출생자') === -1) {
                  if(concertInfoModi[i].indexOf('기간 : ') !== -1) inputPeriod.push(concertInfoModi[i].split('기간 : ')[1]);
                  else if(concertInfoModi[i].indexOf('기간: ') !== -1) inputPeriod.push(concertInfoModi[i].split('기간: ')[1]);
                  else if(concertInfoModi[i].indexOf('기간:') !== -1) inputPeriod.push(concertInfoModi[i].split('기간:')[1]);
                  else if(concertInfoModi[i].indexOf('일자 : ') !== -1) inputPeriod.push(concertInfoModi[i].split('일자 : ')[1]);
                  else if(concertInfoModi[i].indexOf('일자: ') !== -1) inputPeriod.push(concertInfoModi[i].split('일자: ')[1]);
                  else if(concertInfoModi[i].indexOf('일자:') !== -1) inputPeriod.push(concertInfoModi[i].split('일자:')[1]);
                  else if(concertInfoModi[i].indexOf('일시 : ') !== -1) inputPeriod.push(concertInfoModi[i].split('일시 : ')[1]);
                  else if(concertInfoModi[i].indexOf('일시: ') !== -1) inputPeriod.push(concertInfoModi[i].split('일시: ')[1]);
                  else if(concertInfoModi[i].indexOf('일시:') !== -1) inputPeriod.push(concertInfoModi[i].split('일시:')[1]);
                  else if(concertInfoModi[i].indexOf('년') !== -1 && concertInfoModi[i].indexOf('월') !== -1) inputPeriod.push(concertInfoModi[i]);
                  inputPeriod = inputPeriod.filter((el) => el !== undefined && el !== '')
                }
              } 
              // 공연 장소 (place)
              else if(concertInfoModi[i].indexOf('장소') !== -1 || concertInfoModi[i].indexOf('장 소') !== -1 || concertInfoModi[i].indexOf('공연장') !== -1 || concertInfoModi[i].indexOf('노들섬') !== -1) {
                if(concertInfoModi[i].indexOf('정부') === -1) {
                  if(concertInfoModi[i].indexOf('장소 : ') !== -1)  inputPlace = concertInfoModi[i].split('장소 : ')[1];
                  else if(concertInfoModi[i].indexOf('장소: ') !== -1)  inputPlace = concertInfoModi[i].split('장소: ')[1];
                  else if(concertInfoModi[i].indexOf('장소:') !== -1)  inputPlace = concertInfoModi[i].split('장소:')[1];
                  else if(concertInfoModi[i].indexOf('장 소 : ') !== -1)  inputPlace = concertInfoModi[i].split('장 소 : ')[1];
                  else if(concertInfoModi[i].indexOf('장 소: ') !== -1)  inputPlace = concertInfoModi[i].split('장 소: ')[1];
                  else if(concertInfoModi[i].indexOf('장 소:') !== -1)  inputPlace = concertInfoModi[i].split('장 소:')[1];
                  else if(concertInfoModi[i].indexOf('공연장 : ') !== -1)  inputPlace = concertInfoModi[i].split('공연장 : ')[1];
                  else if(concertInfoModi[i].indexOf('공연장: ') !== -1)  inputPlace = concertInfoModi[i].split('공연장: ')[1];
                  else if(concertInfoModi[i].indexOf('공연장:') !== -1)  inputPlace = concertInfoModi[i].split('공연장:')[1];
                  else inputPlace = concertInfoModi[i]
                }
              }
              // 티켓가격 (price)
              else if(concertInfoModi[i].indexOf('가격') !== -1 || concertInfoModi[i].indexOf('티켓가') !== -1 || concertInfoModi[i].indexOf('원') !== -1) {
                if(concertInfoModi[i].indexOf('가격 : ') !== -1) inputPrice = concertInfoModi[i].split('가격 : ')[1];
                else if(concertInfoModi[i].indexOf('가격: ') !== -1) inputPrice = concertInfoModi[i].split('가격: ')[1];
                else if(concertInfoModi[i].indexOf('가격:') !== -1) inputPrice = concertInfoModi[i].split('가격:')[1];
                else if(concertInfoModi[i].indexOf('티켓가 : ') !== -1) inputPrice = concertInfoModi[i].split('티켓가 : ')[1];
                else if(concertInfoModi[i].indexOf('티켓가: ') !== -1) inputPrice = concertInfoModi[i].split('티켓가: ')[1];
                else if(concertInfoModi[i].indexOf('티켓가:') !== -1) inputPrice = concertInfoModi[i].split('티켓가:')[1];
                else inputPrice = concertInfoModi[i].split(':')[1]
              }
              // 러닝타임 (running_time)
              else if(concertInfoModi[i].indexOf('타임') !== -1 || concertInfoModi[i].indexOf('관람시간') !== -1 || concertInfoModi[i].indexOf('시간') !== -1) {
                if(concertInfoModi[i].indexOf('타임:') !== -1) inputRunningTime = concertInfoModi[i].split('타임:')[1];
                else if(concertInfoModi[i].indexOf('타임: ') !== -1) inputRunningTime = concertInfoModi[i].split('타임: ')[1];
                else if(concertInfoModi[i].indexOf('타임 : ') !== -1) inputRunningTime = concertInfoModi[i].split('타임 : ')[1];
                else if(concertInfoModi[i].indexOf('관람시간:') !== -1) inputRunningTime = concertInfoModi[i].split('관람시간:')[1];
                else if(concertInfoModi[i].indexOf('관람시간: ') !== -1) inputRunningTime = concertInfoModi[i].split('관람시간: ')[1];
                else if(concertInfoModi[i].indexOf('관람시간 : ') !== -1) inputRunningTime = concertInfoModi[i].split('관람시간 : ')[1];
                else if(concertInfoModi[i].indexOf('공연시간 : ') !== -1) inputRunningTime = concertInfoModi[i].split('공연시간 : ')[1];
                else if(concertInfoModi[i].indexOf('공연시간: ') !== -1) inputRunningTime = concertInfoModi[i].split('공연시간: ')[1];
                else if(concertInfoModi[i].indexOf('공연시간:') !== -1) inputRunningTime = concertInfoModi[i].split('공연시간:')[1];
              }
              // 관람등급 (rating)
              else if(concertInfoModi[i].indexOf('등급') !== -1 || concertInfoModi[i].indexOf('관람등급') !== -1 || concertInfoModi[i].indexOf('연령') !== -1) {
                if(concertInfoModi[i].indexOf('등급:') !== -1) inputRating = concertInfoModi[i].split('등급: ')[1];
                if(concertInfoModi[i].indexOf('등급 :') !== -1) inputRating = concertInfoModi[i].split('등급 : ')[1];
                if(concertInfoModi[i].indexOf('연령:') !== -1) inputRating = concertInfoModi[i].split('연령: ')[1];
                if(concertInfoModi[i].indexOf('연령 :') !== -1) inputRating = concertInfoModi[i].split('연령 : ')[1];
              }    
            };
            // 공연 이미지
            let imgPath = '//*[@id="NoticeRead"]/div[3]/div/div[1]/img';
            let imageResult = await driver.findElements(By.xpath(imgPath));
            let inputImage = await imageResult[0].getAttribute('src');

            let inputUrl = targetUrl.replaceAll(`'`, '')
            
            // 현재 Url이 DB에 있는 것보다 작거나 같으면 break, 더 크면 DB에 넣어준다
            if(Number(inputUrl.split('#id=')[1] <= lastUrlNum)) break;
            else {
              concertList.push({
                exclusive: exclusive,
                open_date: openDateFormatterYes(ticketOpen),
                post_date: inputDate,
                image_concert: inputImage,
                title: inputTitle || title,
                period: inputPeriod,
                place: inputPlace,
                price: inputPrice,
                running_time: inputRunningTime,
                rating: inputRating,
                link: inputUrl,
              });
            }
          }; // 없으면 안한다
        }
          
          /********************************************************************************************************************/

          if(trNum === 21) {
            trNum = 2
            pageNum++
          } else {
            trNum++
          }

          console.log('------------------ trNum, pageNum ---------------', trNum, pageNum)

          address = `http://ticket.yes24.com/New/Notice/NoticeMain.aspx?Gcode=009_215#page=${pageNum}`
          let targetAddress = `'` + `${address}` + `'`

          await driver.executeScript(`window.open(${targetAddress})`);
          windows = await driver.getAllWindowHandles();
          
          // 해당 탭으로 이동
          await driver.switchTo().window(windows[windows.length-1]);
          await driver.sleep(10000*1.5);

      } 
      // while문 조건
      while(pageNum < 5) 
      
      console.log('-------------- YES24 크롤링 종료 -----------------')
      await driver.sleep(10000*1.5);
      driver.quit();
    } catch(error) {
      console.log('-------------- 에러를 확인해주세요! ----------------- ', error);
    }

    console.log('-------------- concertList ----------------- ', concertList)
    
    return concertList
}

module.exports = {
  yes24Crawler
}
