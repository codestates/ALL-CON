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
  '00 00 * * * *',
  async () => {
    concertCleaner()
    console.log('24시간마다 티켓 오픈일이 지난 콘서트 삭제중(non-activation)..')
  }
)
/* Auto Crawling */
const autoCrawling = schedule.scheduleJob(
  '00 05 * * * *',
  async () => {
    console.log('ec2 테스트')
    await crawler()
    console.log('24시간마다 크롤링중..')
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

// ****************** multer 테스트 ************************ //
const multer = require('multer');
app.use('/uploads', express.static('uploads'));

const upload = multer({
  storage: multer.diskStorage({
    // set a localstorage destination
    destination: (req, file, cb) => {
      console.log('**************************************************', req)
      console.log('**************************************************', file)
      cb(null, 'uploads/');
    },
    // convert a file name
    filename: (req, file, cb) => {
      // console.log(req)
      cb(null, file.originalname);
    },
  }),
});

const { uploadFile, getFileStream } = require('./s3')
app.get('/upload/:key', (req, res) => {

  console.log('---- upload get 진입확인 ----')

  const key = req.params.key
  const readStream = getFileStream(key)

  readStream.pipe(res)
})

// 클라이언트에서 받은 이미지를 업로드
app.post('/upload', upload.single('img'), async (req, res) => {
  // app.post('/upload', async (req, res) => {
try{
  console.log('서버 이미지 업로드 API 진입했습니다!')

  const file = req.file
  console.log('서버 file', file)
  const result = await uploadFile(file)
  console.log(result)
  const description = req.body.description

  // res.status(200).json({ data: { img: req.file.path }, message: 'Image Upload Success!' })
  // res.json({ result: result, imagePath: `/upload/${result.key}`})
  res.status(201).json({ result: result, imagePath: `${result.key}`})

}catch(err) {
  console.log(err)
}

});

// ****************** multer 테스트 ************************ //
/* Routing */ 
app.use('/', router.authRouter);
app.use('/oauth', router.oauthRouter);
app.use('/user', router.userRouter);
app.use('/concert', router.concertRouter);

/* Running */ 
const server = app.listen(port, () => console.log(`${port} port http server runnning`));
module.exports = server;