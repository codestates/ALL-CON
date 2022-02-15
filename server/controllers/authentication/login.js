const { generateAccessToken, sendAccessToken } = require('../../middlewares/tokenFunction');
const { Users } = require('../../models');
const util = require('util');
const crypto = require('crypto');
const pbkdf2Promise = util.promisify(crypto.pbkdf2);

module.exports = {
  post: async (req, res) => {
    try {
      const { email, password } = req.body;

      // 입력값이 잘못된 요청의 경우
      if(!email || !password) return res.status(400).json({ message: 'Bad Request!' });

      // 입력한 email값과 일치하는 유저 정보를 가져온다
      const emailInfo = await Users.findOne({ where: { email: email } });
      // 없는 email 로그인 요청의 경우
      if(!emailInfo) return res.status(403).json({ message: 'Invalid Email!' });

      /* 비밀번호 검증 */
      // emailInfo에서 userSalt 정보를 가져온다.
      const userSalt = emailInfo.dataValues.userSalt;
      // 입력된 password값을 emailInfo에 담긴 userSalt로 똑같이 해싱한다.
      const key = await pbkdf2Promise(password, userSalt, 106699, 64, 'sha512');
      // 문자열로 변한한 뒤 hashedPassword 변수에 값을 저장
      const hashedPassword = key.toString("base64");

      // 입력한 email & 해싱된 password값이 일치하는 유저 정보를 가져온다
      const userInfo = await Users.findOne({ where: { email: email, password: hashedPassword } });

      if(!userInfo){
        return res.status(401).json({ message: 'Unauthorized Password!' });
      } else {
        // 회원의 민감정보(비밀번호) 삭제
        delete userInfo.dataValues.password;

        // accessToken을 발급하고 쿠키에 저장
        const accessToken = generateAccessToken(userInfo.dataValues);
        sendAccessToken(res, accessToken);

        // 회원정보를 반환
        res.status(200).json({ data: { userInfo: userInfo }, message: 'Login Success!' });
      }
    } catch (err) {
      console.log(err)
      return res.status(500).json({ message: 'Server Error!' });
    }
  }
};