require('dotenv').config();
const { Alarms } = require('../../models');
const twilio = require("twilio")(process.env.TWILIO_SID, process.env.TWILIO_TOKEN);

const phoneAlarm = async (alarmInfo) => {

  console.log(' ------------ phoneAlarm 확인 ------------------ ')
  console.log(alarmInfo)

  // 인증번호 발송
  twilio.messages.create({
    from: process.env.TWILIO_PHONE,
    to: `+82${Number(alarmInfo.phone_number)}`,
    body: `[ALL-CON] [${alarmInfo.title}] 티켓 오픈일 하루전입니다.`,
  }); 

  // 문자메시지를 보낸 알람은 테이블에서 삭제
  await Alarms.destroy({
    where: { 
      user_id: alarmInfo.user_id, 
      concert_id: alarmInfo.concert_id
    }
  })
}

module.exports = {
  phoneAlarm
}




// module.exports = {
//   post: async (req, res) => {
//     try {
//       // 로그인 인증 검사
//       // const userInfo = await userAuth(req, res);

//       /* 임시 TEST CODE (삭제예정) */
//       // POSTMAN 테스트시 => req.body = { id }
//       const userInfo = await Users.findOne({
//         where: { id: req.body.id }
//       });
//       /* 임시 TEST CODE (삭제예정) */

//       const { phone_number } = req.body;

//       // 요청 바디로 받은 번호가 유효하지 않을때
//       if(!phone_number) return res.status(400).json({ message: 'Bad Request!' });
      
//       // 6자리 난수 생성
//       const max = 999999;
//       const min = 100000;
//       const confirmNumber = Math.floor(Math.random() * (max - min)) + min;
      
//       // 인증번호 발송
//       twilio.messages.create({
//         from: process.env.TWILIO_PHONE,
//         to: `+82${Number(phone_number)}`,
//         body: `ALL-CON 인증번호는 [${confirmNumber}] 입니다.`,
//       });

//       // Users 테이블 message_key 필드 업데이트
//       await Users.update(
//         { message_key: confirmNumber },
//         { where: { id: userInfo.id }}
//       )
      
//       // 인증번호 입력 시간이 지나면, message_key 값이 expired로 변경한다
//       setTimeout(async function() {
//         const messageKeyChecker = await Users.findOne({ where: { id: userInfo.id } })
//         if(messageKeyChecker.message_key !== 'success'){
//           await Users.update(
//             { message_key: 'expired' },
//             { where: { id: userInfo.id }}
//           )
//         }
//       }, 60000)

//       res.status(200).json({ message: 'Success Send Message!' });
//     } catch (err) {
//       return res.status(500).json({ message: 'Server Error!' });
//     }
//   },
//   patch: async (req, res) => {
//     try {
//       // 로그인 인증 검사
//       // const userInfo = await userAuth(req, res);

//       /* 임시 TEST CODE (삭제예정) */
//       // POSTMAN 테스트시 => req.body = { id }
//       const userInfo = await Users.findOne({
//         where: { id: req.body.id }
//       });
//       /* 임시 TEST CODE (삭제예정) */

//       // 요청 바디 (생년월일, 성별, 전화번호)
//       const { birth, gender, phone_number } = req.body;

//       // birth, gender, phone_number 중 하나라도 전달이 되지 않은 경우, 다음을 응답한다
//       if(!birth || !gender || !phone_number) return res.status(400).json({ message: 'Bad Request!' });
//       // 휴대폰 인증이 완료되지 않은 경우, 다음을 응답한다
//       if(userInfo.message_key !== 'success') return res.status(401).json({ message: 'Message_Key Is Not Authorized!' });

//       // 유효한 요청 바디가 전달되는 경우 Users 정보 업데이트
//       await Users.update(
//         {
//           birth: birth,
//           gender: gender,
//           phone_number: phone_number,
//           role: 2,
//           message_key: 'expired'
//         },
//         { where : { id: userInfo.id } }
//       );
      
//       // 새로 업데이트한 회원정보 조회
//       const newUserInfo = await Users.findOne({ where: { id: userInfo.id } });
//       // 업데이트된 회원정보 반환
//       res.status(200).json({ data: { userInfo: newUserInfo }, message: 'Updated Success!' });
//     } catch (err) {
//       console.log(err);
//       return res.status(500).json({ message: 'Server Error!' });
//     }
//   }
// };