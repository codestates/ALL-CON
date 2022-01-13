require('dotenv').config();
const { userAuth } = require('../../middlewares/authorized/userAuth')
const { Users } = require('../../models');

module.exports = {
  patch: async (req, res) => {
    try {
       // 로그인 인증 검사
      const userInfo = await userAuth(req, res);
      // 클라이언트로부터 변경할 프로필 사진 url을 전달받는다
      const { image } = req.body

      // 유저의 프로필 사진 url을 변경해준다
     await Users.update(
        { image: image},
        { where: { id: userInfo.dataValues.id }}
      )

      const updatedUserInfo = await Users.findOne({ where: { id: userInfo.dataValues.id }})

      console.log('----- userInfo', userInfo)
      console.log('----- updatedUserInfo', updatedUserInfo)

      res.status(201).json({ data: { userInfo: updatedUserInfo }, message: 'Profile Change Success!' });
    } catch (err) {
      console.log(err)
      return res.status(500).json({ message: 'Server Error!' });
    }
  }
};