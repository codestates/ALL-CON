const { interparkCrawler } = require('./middlewares/crawler/interparkCrawler');
const { yes24Crawler } = require('./middlewares/crawler/yes24Crawler');
const { Concerts } = require('./models');
const router = require('./routers');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const express = require('express');
const schedule = require('node-schedule');

const app = express();
const port = 8080;

/* Auto Crawling */
const autoCrawling = schedule.scheduleJob(
  '00 15 1 * * *',
  async () => {
    
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
    
    console.log('1시간마다 크롤링중..')
  }
);

/* Middleware */
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(
  cors({
    origin: ['http://localhost:3000'],
    credentials: true,
    methods: ['GET', 'POST', 'PATCH', 'DELETE', 'OPTIONS']
  })
); 

/* 크롤링 테스트 */
app.get('/', async (req, res) => {
  try {
    console.log("크롤링 테스트 함수 진입 성공")

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
    for(let i = 0; i < interData.length; i++) {
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

    res.status(200).json({ data: { concerts: concerts }, message: '크롤링 테스트 성공!' });
  } catch (err) {
    console.log("err 확인!", err)
    return res.status(500).json({ message: 'Server Error!' });
  }
})

/* 크로링 테스트 */

/* Routing */ 
app.use('/', router.authRouter);
app.use('/oauth', router.oauthRouter);
app.use('/user', router.userRouter);
app.use('/concert', router.concertRouter);

/* Running */ 
const server = app.listen(port, () => console.log(`${port} port http server runnning`));
module.exports = server;