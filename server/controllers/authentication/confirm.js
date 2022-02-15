require('dotenv').config();
const { Users } = require('../../models');
const util = require('util');
const crypto = require('crypto');
const pbkdf2Promise = util.promisify(crypto.pbkdf2);

module.exports = {
  post: async (req, res) => {
    try {
      // 유저가 입력한 인증번호를 전달 받는다
      const { email_key } = req.body;
      // 전달받은 인증번호가 없을 경우, 다음을 실행한다
      if(!email_key) return res.status(400).json({ message: 'Bad Request!' });

      // 전달받은 email_key를 'sha256' 알고리즘, 'base64' 문자열 형식으로 해싱한다
      const hashedNumber = crypto.createHash('sha256').update(String(email_key)).digest('base64');

      // 인증번호가 전달된 경우, 다음을 실행한다
      const isValid = await Users.findOne({ where: { email_key: hashedNumber }})
      // 입력한 email_key값과 일치하는 유저정보가 없다면, 다음을 실행한다
      if(!isValid) return res.status(403).json({ message: 'Invalid Email Key!' })

      // Users 테이블 email_key 비밀번호 변경 가능 상태인 'success'로 업데이트
      await Users.update(
        { email_key: 'success'},
        { where: { id: isValid.id }}
      )
      res.status(200).json({ email: isValid.email, message: 'Success Email Certification!'})
    } catch (err) {
      // console.log(err)
      return res.status(500).json({ message: 'Server Error!' });
    }
  },
  patch: async (req, res) => {
    try {
      // 클라이언트로부터 email, newPassword를 전달 받는다. 
      const { email, newPassword } = req.body

      // 요청 바디의 값이 없다면 에러메시지 반환
      if(!email || ! newPassword) return res.status(400).json({ message: 'Bad Request!' });
      // email_key 값이 'success' 상태라면, 비밀번호를 업데이트 한뒤, email_key값도 expired로 변경해준다.
      const userInfo = await Users.findOne({ where: { email: email } })
      if(userInfo.email_key !== 'success') return res.status(401).json({ message: 'Email Key Is Not Authorized!' });

      /* 비밀번호 암호화 */ 
      // 64바이트 Salt 생성, buffer 형식이므로 base64 문자열로 변환
      const salt = crypto.randomBytes(64).toString('base64');
      // password를 salt를 첨가하여 sha512 알고리즘으로 106,699번 해싱 후 64바이트 buffer 형식으로 반환
      const key = await pbkdf2Promise(newPassword, salt, 106699, 64, 'sha512');
      // key값은 buffer 형식이므로 base64 문자열로 변환한 값을 hashedPassword 변수에 넣는다.
      const hashedPassword = key.toString('base64');
      
      await userInfo.update(
        { 
          password: hashedPassword, // 해싱된 비밀번호
          userSalt: salt, // 유저 고유의 Salt값 DB에 저장 (추후 로그인에 필요)
          email_key: 'expired'
        },
        { where: { email: email }}
      )
      res.status(200).json({ message: 'Success Change Password!' });
    } catch (err) {
      // console.log(err);
      return res.status(500).json({ message: 'Server Error!' });
    }
  }
};