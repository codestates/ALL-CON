require('dotenv').config();
const { userAuth } = require('../../middlewares/authorized/userAuth')
const { Users } = require('../../models');

module.exports = {
  post: async (req, res) => {
    try {
      // 로그인 인증 검사
      // const userInfo = await userAuth(req, res);

      /* 임시 TEST CODE (삭제예정) */
      // POSTMAN 테스트시 => req.body = { id }
      const userInfo = await Users.findOne({
        where: { id: req.body.id }
      });
      /* 임시 TEST CODE (삭제예정) */
      
      const { message_key } = req.body;

      if(!message_key) return res.status(400).json({ message: 'Bad Reqeust!' });
      if(message_key !== userInfo.message_key) return res.status(401).json({ message: 'Message_Key Is Not Authorized!' });

      // message_key 'success' 업데이트
      await Users.update(
        { message_key: 'success' },
        { where: { id: userInfo.id }}
      )

      res.status(200).json({ message: 'Succes Message Certification!' });
    } catch (err) {
      return res.status(500).json({ message: 'Server Error!' });
    }
  }
};