const nodemailer = require('nodemailer');
const { Users, Alarms } = require('../../models');
require('dotenv').config();

const emailAlarm = async (alarmInfo) => {


  console.log("********************* emailAlarm 확인!!! ********************")
  console.log(alarmInfo)

  const userInfo = await Users.findOne({ id: alarmInfo.user_id })

  const username = userInfo.username;
  const concertTitle = alarmInfo.title
  const concertOpenDate = alarmInfo.open_date;
  const concertImageUrl = alarmInfo.image_concert
  const concertUrl = alarmInfo.link

  const allconLog = 'https://allcon-image-bucket.s3.ap-northeast-2.amazonaws.com/allConLogo.png'

  // 송신 이메일 설정
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    auth: {
      user: `${process.env.EMAIL_ID}`,
      pass: `${process.env.EMAIL_PASS}`
    }
  })

  var mailOptions = {
    from: `<${process.env.EMAIL_ID}>`,
    to: `${alarmInfo.email}`,
    subject: `[All-Con] 콘서트 티켓오픈일 알림 - ${alarmInfo.title}`,
    text: `${alarmInfo.title}의 티켓오픈일은 ${alarmInfo.open_date} 입니다!`,
    html: `

    <table align="center" border="1" cellpadding="0" cellspacing="0" width="800">
 <tr>
 <td align="center" bgcolor="#ffffff" >
  <img alt="Concert Image" width="50" height="50" style="display:block;" src=${allconLog}  />
  </td>
 </tr>
 <tr>
  <td align="center" bgcolor="#ffffff" font-size="100">
  ${username} (님), ${concertTitle} 티켓오픈일이 내일입니다!
  </td>
 </tr>
 <tr>
  <td align="center" bgcolor="#ffffff" >
  <img alt="Concert Image" width="300" height="600" style="display:block;" src=${concertImageUrl}  />
  </td>
 </tr>
 <tr>
  <td align="center" bgcolor="#ffffff" aligh="center">
   <p style="margin 0 0 8px 0;"><a href=${concertUrl} style="text-decoration:none;">예메하러 가기 </a> </p>
  </td>
 </tr>
</table>
    `,
  };



  await transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return console.log(error);
    }
    console.log('Message sent: %s', info.messageId);
  });
}

  // 이메일은 보낸 알람은 테이블에서 삭제
//   await Alarms.destroy({
//     where: { 
//       user_id: alarmInfo.user_id, 
//       concert_id: alarmInfo.concert_id
//     }
//   })
// }

//   // 송신 이메일 포맷 및 내용 설정
//   const info = await transporter.sendMail({
//     from: `<${process.env.EMAIL_ID}>`,
//     to: `${alarmInfo.email}`,
//     subject: `[All-Con] 콘서트 티켓오픈일 알림 - ${alarmInfo.title}`,
//     text: `${alarmInfo.title}의 티켓오픈일은 ${alarmInfo.open_date} 입니다!`
//   })

//   // 이메일은 보낸 알람은 테이블에서 삭제
//   await Alarms.destroy({
//     where: { 
//       user_id: alarmInfo.user_id, 
//       concert_id: alarmInfo.concert_id
//     }
//   })
// }

module.exports = {
  emailAlarm
}