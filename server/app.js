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
const now = new Date().toString();
console.log(now);

// 콘서트 티켓 오픈일 알라머 실행
const autoAlarm = schedule.scheduleJob('00 00 * * * *', async () => {
  await concertAlarm();
});

// 콘서트 클리너 실행
const autoConcertCleaner = schedule.scheduleJob('00 00 09 * * *', async () => {
  await concertCleaner();
});

// Auto Crawling
const autoCrawling = schedule.scheduleJob('00 00 09 * * *', async () => {
  await crawler();
});

/* Middleware */
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(
  cors({
    origin: ['http://localhost:3000'],
    credentials: true,
    methods: ['GET', 'POST', 'PATCH', 'DELETE', 'OPTIONS'],
  }),
);

/* Routing */
app.use('/', router.authRouter);
app.use('/oauth', router.oauthRouter);
app.use('/user', router.userRouter);
app.use('/concert', router.concertRouter);
app.use('/upload', router.uploadRouter);

/* Running */
const server = app.listen(port, () =>
  console.log(`${port} port http server runnning`),
);

module.exports = server;
