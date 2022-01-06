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

      res.status(200).json({ message: 'POST : 휴대폰 인증번호 확인!' });
    } catch (err) {
      return res.status(500).json({ message: 'Server Error!' });
    }
  }
};