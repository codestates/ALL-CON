require('dotenv').config();
const { userAuth } = require('../../middlewares/authorized/userAuth')
const { Users } = require('../../models');

module.exports = {
  post: async (req, res) => {
    try {
      // 로그인 인증 검사
      const userInfo = await userAuth(req, res);
      
      const { message_key } = req.body;

      if(!message_key) return res.status(400).json({ message: 'Bad Request!' });
      if(message_key.toString() !== userInfo.message_key) return res.status(401).json({ message: 'Message_Key Is Not Authorized!' });

      // message_key 'success' 업데이트
      await Users.update(
        { message_key: 'success' },
        { where: { id: userInfo.dataValues.id }}
      )

      res.status(200).json({ message: 'Success Message Certification!' });
    } catch (err) {
      return res.status(500).json({ message: 'Server Error!' });
    }
  }
};