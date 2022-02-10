const ejs = require('ejs');
const nodemailer = require('nodemailer');

const allconLogo = process.env.ALLCON_LOGO_IMAGE;
const youtubeLogo = process.env.YOUTUBE_LOGO_IMAGE;
const instaLogo = process.env.INSTA_LOGO_IMAGE;

// ejs로 작성된 html을 불러오는 함수
const ejsHtmlCaller = async (type, email, object) => {

  // 이메일 송신자 설정 (allcon.master)
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    auth: {
      user: `${process.env.EMAIL_ID}`,
      pass: `${process.env.EMAIL_PASS}`
    }
  });

  // 비밀번호 찾기 이메일 전송
  if(type === 'passwordFind') {
    // ejs 파일에서 html 받아오기      
    let passwordFindHtml;

    const { confirmNumber } = object

    ejs.renderFile(
      __dirname + '/ejsForm/passwordFind.ejs',
      {
        confirmNumber,
        allconLogo,
        youtubeLogo,
        instaLogo,
      },
      (err, data) => {
        if(err) console.log(err);
        passwordFindHtml = data;
      }
    )
    
    // 송신 이메일 포맷 및 내용 설정
    const emailFormat = await transporter.sendMail({
      from: `<${process.env.EMAIL_ID}>`,
      to: `${email}`,
      subject: '🔔[All-Con] 인증번호를 확인해주세요',
      html: passwordFindHtml
    });
  }
  // 콘서트 알람 이메일 전송
  else if(type === 'concertAlarm') {

    const { 
      username,
      concertTitle,
      concertOpenDate,
      concertImageUrl,
      concertUrl,
      hotConcertList } = object
    
    // ejs 파일에서 html 받아오기
    let emailAlarmHtml;
    ejs.renderFile(
      __dirname + '/ejsForm/emailAlarm.ejs',
      {
        username,
        concertTitle,
        concertOpenDate,
        concertImageUrl,
        concertUrl,
        allconLogo,
        youtubeLogo,
        instaLogo,
        hotConcertList
      },
      (err, data) => {
        if(err) console.log(err);
        emailAlarmHtml = data;
      }
    );
    
    // 송신 이메일 포맷 및 내용 설정
    const emailFormat = await transporter.sendMail({
      from: `<${process.env.EMAIL_ID}>`,
      to: `${email}`,
      subject: `🔔[All-Con] 콘서트 티켓오픈일 알림 - ${concertTitle}`,
      // text: `${alarmInfo.title}의 티켓오픈일은 ${alarmInfo.open_date} 입니다!`,
      html: emailAlarmHtml,
    });

  };

}

module.exports = {
  ejsHtmlCaller
}