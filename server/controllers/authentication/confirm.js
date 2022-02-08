const { Users } = require('../../models');
require('dotenv').config();

module.exports = {
  post: async (req, res) => {
    try {
      // 유저가 입력한 인증번호를 전달 받는다
      const { email_key } = req.body;
      // 전달받은 인증번호가 없을 경우, 다음을 실행한다
      if(!email_key) return res.status(400).json({ message: 'Bad Request!' });

      // 인증번호가 전달된 경우, 다음을 실행한다
      const isValid = await Users.findOne({ where: { email_key: String(email_key) }})
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
      
      userInfo.update(
        { 
          password: newPassword,
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