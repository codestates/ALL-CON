const { userAuth } = require('../../middlewares/authorized/userAuth')
const { Users } = require('../../models');
const { Op } = require('sequelize');
const util = require('util');
const crypto = require('crypto');
const pbkdf2Promise = util.promisify(crypto.pbkdf2);

module.exports = {
  get: async (req, res) => {
    try {
      /* 로그인 인증 검사 */
      const userInfo = await userAuth(req, res);
      if(!userInfo) return res.status(200).json({ message: 'Unauthorized userInfo!' });
      
      // 회원의 민감정보(비밀번호) 삭제
      delete userInfo.dataValues.password;

      // 회원정보 반환
      return res.status(200).json({ data: { userInfo: userInfo }, message: 'Welcome Mypage!' });
    } catch (err) {
      return res.status(500).json({ message: 'Server Error!' });
    }
  },
  patch: async (req, res) => {
    try {
      /* 로그인 인증 검사 */
      const userInfo = await userAuth(req, res);
      if(!userInfo) return res.status(200).json({ message: 'Unauthorized userInfo!' });

      const { username, introduction, password } = req.body;

      // 요청 바디에 username이 있다면, 나를 제외한 username 중 이미 존재하는지 검사
      if(username) {
        const usernameInfo = await Users.findOne({ 
          where: { 
            username: username,
            [Op.not]: [{ id: userInfo.dataValues.id }]
          }
        });
        // 이미 존재하는 username이면 요청 거절
        if(usernameInfo) return res.status(409).json({ message: 'Username Is Already Existed!' });
      }

      /* 비밀번호 암호화 */ 
      // 64바이트 Salt 생성, buffer 형식이므로 base64 문자열로 변환
      const salt = crypto.randomBytes(64).toString('base64');
      // password를 salt를 첨가하여 sha512 알고리즘으로 106,699번 해싱 후 64바이트 buffer 형식으로 반환
      const key = await pbkdf2Promise(password, salt, 106699, 64, 'sha512');
      // key값은 buffer 형식이므로 base64 문자열로 변환한 값을 hashedPassword 변수에 넣는다.
      const hashedPassword = key.toString('base64');

      // 요청 바디가 없는 값은 그대로 유지, 있다면 새로 업데이트 한다
      await Users.update(
        {
          username: username ? username : userInfo.dataValues.username,
          introduction: introduction ? introduction : userInfo.dataValues.introduction,
          password: hashedPassword,
          userSalt: salt
        },
        { where : { id: userInfo.dataValues.id } }
      );

      // 새로 업데이트한 회원정보 조회 후 민감정보(비밀번호) 삭제
      const newUserInfo = await Users.findOne({ where: { id: userInfo.dataValues.id } });
      delete newUserInfo.dataValues.password;
      
      // 업데이트된 회원정보 반환
      res.status(200).json({ data: { userInfo: newUserInfo }, message: 'Updated Success!' });
    } catch (err) {
      return res.status(500).json({ message: 'Server Error!' });
    }
  },
  delete: async (req, res) => {
    try {
      /* 로그인 인증 검사 */
      const userInfo = await userAuth(req, res);
      if(!userInfo) return res.status(200).json({ message: 'Unauthorized userInfo!' });

      Users.destroy({ where: { id: userInfo.id } });  // 유저 삭제

      res.cookie('accessToken', null, { maxAge: 0 });  // 쿠키 삭제
      res.status(200).json({ message: 'Goodbye!' });
    } catch (err) {
      console.log(err);
      return res.status(500).json({ message: 'Server Error!' });
    }
  }
};