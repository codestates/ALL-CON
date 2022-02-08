const { Users } = require('../../models');
const util = require('util');
const crypto = require('crypto');
const pbkdf2Promise = util.promisify(crypto.pbkdf2);

module.exports = {
  post: async (req, res) => {
    try {
      const { email, password, username } = req.body;
      // email, password, username 중 하나라도 전달이 되지 않은 경우, 다음을 응답한다
      if(!email || !password || !username) return res.status(400).json({ message: 'Bad Request!' });

      // 만약 email 혹은 username이 이미 존재한다면, 다음을 응답한다
      const userEmailInfo = await Users.findOne({ where: { email: email } });
      const userNameInfo = await Users.findOne({ where: { username: username } });

      if(userEmailInfo) return res.status(409).json({ message: 'Email Is Already Existed!' });
      else if(userNameInfo) return res.status(409).json({ message: 'Username Is Already Existed!' });

      // 만약 신청한 email이 존재하지 않는다면, DB users 테이블에 유저 정보 추가한 후 다음을 응답한다
      else {
        /* 비밀번호 암호화 */ 
        // 64바이트 Salt 생성, buffer 형식이므로 base64 문자열로 변환
        const salt = crypto.randomBytes(64).toString('base64');
        // password를 salt를 첨가하여 sha512 알고리즘으로 106,699번 해싱 후 64바이트 buffer 형식으로 반환
        const key = await pbkdf2Promise(password, salt, 106699, 64, 'sha512');
        // key값은 buffer 형식이므로 base64 문자열로 변환한 값을 hashedPassword 변수에 넣는다.
        const hashedPassword = key.toString("base64");
        
        // 신규회원 생성
        await Users.create({ 
          email: email, 
          password: hashedPassword, // 해싱된 비밀번호
          userSalt: salt,  // 유저 고유의 Salt값 DB에 저장 (추후 로그인에 필요)
          username: username, 
          image: process.env.USER_DEFAULT_IMAGE,
          sign_method: 'allcon' 
        });

        res.status(201).json({ message: 'Signup Success!' });
      }
    } catch (err) {
      console.log(err);
      return res.status(500).json({ message: 'Server Error!' });
    }
  }
};