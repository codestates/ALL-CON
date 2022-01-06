require('dotenv').config();
const { userAuth } = require('../../middlewares/authorized/userAuth')
const { Users } = require('../../models');
const twilio = require("twilio")(process.env.TWILIO_SID, process.env.TWILIO_TOKEN);

module.exports = {
  post: async (req, res) => {
    try {
      // 로그인 인증 검사
      // const userInfo = await userAuth(req, res);

      /* 임시 TEST CODE (삭제예정) */
      // POSTMAN 테스트시 => req.body = { id, email }
      const userInfo = req.body; 
      /* 임시 TEST CODE (삭제예정) */

      const { phone_number } = req.body;

      if(!phone_number) return res.status(404).json({ message: 'Bad Request!' });
      
      // const authCode = await twilioHelper.auth(phone_number);
      // console.log(authCode);
      
      twilio.messages.create({
        from: process.env.TWILIO_PHONE,
        to: `+82${Number(phone_number)}`,
        body: `ALL-CON 문자메시지 테스트`,
      });

      res.status(200).json({ message: 'POST : 휴대폰 인증 요청!' });
    } catch (err) {
      return res.status(500).json({ message: 'Server Error!' });
    }
  },
  patch: async (req, res) => {
    try {
      // 로그인 인증 검사
      // const userInfo = await userAuth(req, res);

      /* 임시 TEST CODE (삭제예정) */
      // POSTMAN 테스트시 => req.body = { id, email }
      const userInfo = req.body; 
      /* 임시 TEST CODE (삭제예정) */

      // 요청 바디 (생년월일, 성별, 전화번호)
      const { birth, gender, phone_number } = req.body;

      // birth, gender, phone_number 중 하나라도 전달이 되지 않은 경우, 다음을 응답한다
      if(!birth || !gender || !phone_number) return res.status(400).json({ message: 'Bad Request!' });

      // 유효한 요청 바디가 전달되는 경우 Users 정보 업데이트
      await Users.update(
        {
          birth: birth,
          gender: gender,
          phone_number: phone_number,
          role: 2
        },
        { where : { id: userInfo.id } }
      );
      
      // 새로 업데이트한 회원정보 조회
      const newUserInfo = await Users.findOne({ where: { id: userInfo.id } });
      // 업데이트된 회원정보 반환
      res.status(200).json({ data: { userInfo: newUserInfo }, message: 'Updated Success!' });
    } catch (err) {
      console.log(err);
      return res.status(500).json({ message: 'Server Error!' });
    }
  }
};