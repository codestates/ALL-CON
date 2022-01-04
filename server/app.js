const { interparkCrawler } = require('./middlewares/crawler/interparkCrawler');
const router = require('./routers');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const express = require('express');

const app = express();
const port = 8080;

interparkCrawler();

// Middleware
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

// Routing
app.use('/', router.authRouter);
app.use('/oauth', router.oauthRouter);
app.use('/user', router.userRouter);
app.use('/concert', router.concertRouter);
app.use('/concert/:concertid/comment', router.concertCommentRouter);
app.use('/concert/:concertid/article/:articleid/comment', router.conchinCommentRouter);

// Running
const server = app.listen(port, () => console.log(`${port} port http server runnning`));
module.exports = server;