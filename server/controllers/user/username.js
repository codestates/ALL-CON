const { userAuth } = require('../../middlewares/authorized/userAuth')
const { Users } = require('../../models');
const { Op } = require('sequelize');

module.exports = {
  post: async (req, res) => {
    try {
      // 로그인 인증 검사
      const userInfo = await userAuth(req, res);
      // 클라이언트로부터 받은 유저네임
      const { username } = req.body;

      // 요청 바디에 username이 없다면, 에러메시지 반환
      if(!username) return res.status(400).json({ message: 'Bad Request!' });

      // 현재 유저의 닉네임
      const currentUsername = userInfo.dataValues.username

      // 현재 유저가 사용하고 있는 닉네임을 제외하고, DB에 중복된 닉네임이 있는지 확인 (유저가 현재 사용하고 있는 닉네임은 사용가능)
      const usernameDuplicationInfo = await Users.findOne({
        where: {
          username: {
            [Op.and]: {
              [Op.eq]: username,
              [Op.ne]: currentUsername
            }
          }
        }
      })

      // 요청한 닉네임이 중복되지 않았다면, 다음을 실행한다
      if(!usernameDuplicationInfo) return res.status(200).json({ state : true, message: 'Username Is No Existed!' });
      // 닉네임이 중복되었다면, 다음을 실행한다
      else return res.status(200).json({ state: false, message: 'Username Is Already Existed!' });

    } catch (err) {
      return res.status(500).json({ message: 'Server Error!' });
    }
  }
};