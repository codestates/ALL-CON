const { Capabilities, Builder, By, Key, until } = require('selenium-webdriver');
const { openDateFormatterYes } = require('./openDateFormatterYes');
const caps = new Capabilities();
caps.setPageLoadStrategy("eager");

/* 티켓 오픈 공지 게시물 URL 크롤러 함수 */
const yes24Crawler = async () => {

  let url = '';
  let concertList = [];

  let driver = await new Builder().
  withCapabilities(caps).
  forBrowser('chrome').
  build();

    try {
      // yes24 티켓오픈 공지사항 페이지
      let address = 'http://ticket.yes24.com/New/Notice/NoticeMain.aspx?Gcode=009_215';

      let path = '//*[@id="BoardList"]/div/table/tbody/tr[2]/td[2]/a';
      
      await driver.get(address); 

      await driver.sleep(10000);
      
      let result = await driver.findElements(By.xpath(path));

      if(result.length !== 0) {
        url = await result[0].getAttribute('href');
      }

      if(url) {
        let baseUrl = address;
        let addition = '#id=';
        let extractId = url.split('#id=')[1];

        let cnt = 1;

        //  ----------------- 현재 페이지 게시물 조회... ----------------- 
        for(let i = 10; i < 17; i++) {      

          let num = Number(extractId) - i;
          let str = num.toString();
          let targetUrl = `'` + `${baseUrl}` + `${addition}` + `${str}` + `'`;

          await driver.executeScript(`window.open(${targetUrl})`);
          let windows = await driver.getAllWindowHandles();
          // console.log("windows:", windows, windows.length, windows[windows.length-1])

          await driver.switchTo().window(windows[windows.length-1]);

          await driver.sleep(5000);

          let subPath = '//*[@id="NoticeRead"]/div[3]/div/div[2]/p';
          // <p class="noti-vt-tit"><span>단독판매</span>2022 영주세계풍기인삼엑스포</p>

          // 단독판매 유무 판단 / 콘서트 이외의 컨텐츠 필터
          let subResult = await driver.findElements(By.className('noti-vt-tit'));

          // 배열 subResult에 요소가 담겨있지 않은 경우는 skip
          if(subResult.length !== 0) {

          let title = await subResult[0].getText();
          // 제목 앞에 '단독판매' 문구가 있으면 변수 eclusive에 'YES24'를 할당, 없으면 null
          let exclusive = '';

          if(title.indexOf('단독판매') !== -1) {
            exclusive = 'YES24';
            title = title.split('단독판매')[1]
          }
          
          // 만약 candidate 문자열에 콘서트가 포함되어있으면,
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
            
            // 각 콘서트 객체 값, 초기화
            let inputTitle = '';
            let inputPeriod = [];
            let inputShow_schedule = '';
            let inputPlace = '';
            let inputPrice = '';
            let inputRunningTime = '';
            let inputRating = '';

            let concertInfoModi = concertInfo.split('\n');

            for(let i = 0; i < concertInfoModi.length; i++) {
              
              // console.log("**************** concertInfoModi[i] *****************", concertInfoModi[i])

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
              else if(concertInfoModi[i].indexOf('기간') !== -1|| concertInfoModi[i].indexOf('일자') !== -1 ||  concertInfoModi[i].indexOf('일시') !== -1 
              || (concertInfoModi[i].indexOf('년') !== -1 && concertInfoModi[i].indexOf('월') !== -1)) {
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
              else if(concertInfoModi[i].indexOf('장소') !== -1 || concertInfoModi[i].indexOf('장 소') !== -1 || concertInfoModi[i].indexOf('공연장') !== -1
              || concertInfoModi[i].indexOf('노들섬') !== -1) {
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
                // else inputPrice = concertInfoModi[i].split(" : ")[1];
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
            }

            // 공연 이미지
            let imgPath = '//*[@id="NoticeRead"]/div[3]/div/div[1]/img';
            let imageResult = await driver.findElements(By.xpath(imgPath));
            let inputImage = await imageResult[0].getAttribute('src');
           
            // 각 콘서트 객체를 정의
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
              link: '',
            });

            console.log('*************************************************************************************');
            console.log('concertList:', concertList);

          } 
          // else {
          //   console.log('콘서트가 아닙니다!');
          // }

          cnt++
        }
      }

        driver.quit();
      } else {
        driver.quit();
      }
  } catch(error) {
    console.log('-------------- 에러를 확인해주세요! ----------------- ', error);
  }

  return concertList
}

module.exports = {
  yes24Crawler
}