const { concertAlarm } = require('./middlewares/concertAlarm/concertAlarm.js');
const { concertCleaner } = require('./middlewares/concertCleaner/concertCleaner.js');
const { crawler } = require('./middlewares/crawler/crawler.js');
const router = require('./routers');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const express = require('express');
const schedule = require('node-schedule');

const app = express();
const port = 8080;

// 콘서트 티켓 오픈일 알라머 실행
const autoAlarm = schedule.scheduleJob(
  '00 20 1 * * *',
  async () => {
    concertAlarm()
    console.log('24시간마다 콘서트 알람중..')
  }
)

// 콘서트 클리너 실행
const autoConcertCleaner = schedule.scheduleJob(
  '00 20 1 * * *',
  async () => {
    concertCleaner()
    console.log('24시간마다 티켓 오픈일이 지난 콘서트 삭제중(non-activation)..')
  }
)

/* Auto Crawling */
const autoCrawling = schedule.scheduleJob(
  '00 35 * * * *',
  async () => {
    console.log('ec2 테스트')
    await crawler()
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

/* Routing */ 
app.use('/', router.authRouter);
app.use('/oauth', router.oauthRouter);
app.use('/user', router.userRouter);
app.use('/concert', router.concertRouter);

/* Running */ 
const server = app.listen(port, () => console.log(`${port} port http server runnning`));
module.exports = server;