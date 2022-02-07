const { concertAlarm } = require('./middlewares/concertAlarm/concertAlarm.js');
const {
  concertCleaner,
} = require('./middlewares/concertCleaner/concertCleaner.js');
const { crawler } = require('./middlewares/crawler/crawler.js');
const router = require('./routers');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const express = require('express');
const schedule = require('node-schedule');

const app = express();
const port = 8080;

// 콘서트 티켓 오픈일 알라머 실행
const autoAlarm = schedule.scheduleJob('00 45 * * * *', async () => {
  concertAlarm();
});

// 콘서트 클리너 실행
const autoConcertCleaner = schedule.scheduleJob('00 00 23 * * *', async () => {
  concertCleaner();
});

/* Auto Crawling */
const autoCrawling = schedule.scheduleJob('00 00 9 * * *', async () => {
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

/** ejs 파일 경로 테스트 **/
app.use('/ejsform', express.static(__dirname + '/ejsform'))
/** ejs 파일 경로 테스트 **/

// ****************** multer 테스트 ************************ //
const multer = require('multer');
app.use('/uploads', express.static('uploads'));

const upload = multer({
  storage: multer.diskStorage({
    // set a localstorage destination
    destination: (req, file, cb) => {
      cb(null, 'uploads/');
    },
    // convert a file name
    filename: (req, file, cb) => {
      // console.log(req)
      cb(null, file.originalname);
    },
  }),
});

const { uploadFile, getFileStream } = require('./s3');
app.get('/upload/:key', (req, res) => {
  const key = req.params.key;
  const readStream = getFileStream(key);

  readStream.pipe(res);
});

// 클라이언트에서 받은 이미지를 업로드
app.post('/upload', upload.single('img'), async (req, res) => {
  // app.post('/upload', async (req, res) => {
  try {
    const file = req.file;
    const result = await uploadFile(file);
    const description = req.body.description;

    res.status(201).json({ result: result, imagePath: `${result.key}` });
  } catch (err) {
    console.log(err);
  }
});

// ****************** multer 테스트 ************************ //
/* Routing */
app.use('/', router.authRouter);
app.use('/oauth', router.oauthRouter);
app.use('/user', router.userRouter);
app.use('/concert', router.concertRouter);

/* Running */
const server = app.listen(port, () =>
  console.log(`${port} port http server runnning`),
);
module.exports = server;
