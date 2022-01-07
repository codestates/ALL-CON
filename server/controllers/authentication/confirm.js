const { Users } = require('../../models');
require('dotenv').config();

module.exports = {
  post: async (req, res) => {
    try {
      // 유저가 입력한 인증번호를 전달 받는다s
      const { email_key } = req.body;
      // 전달받은 인증번호가 없을 경우, 다음을 실행한다
      if(!email_key) res.status(400).json({ message: '인증번호를 정확히 입력해주세요!' });
      // 인증번호가 전달된 경우, 다음을 실행한다
      else {
        const isValid = await Users.findOne({ where: { email_key: email_key.toString() }})
        console.log(isValid.dataValues.id)
        await Users.update(
          { email_key: 'expired'},
          { where: { id: isValid.dataValues.id }}
        )
        // 일치하는 유저정보가 없다면, 다음을 실행한다
        if(!isValid) res.status(400).json({ state: false, message: '인증번호가 일치하지 않습니다!' })
        else res.status(400).json({ state: true, message: '인증번호가 일치합니다!'})
      }

    } catch (err) {
      console.log(err)
      return res.status(500).json({ message: 'Server Error!' });
    }
  },
  patch: async (req, res) => {
    try {
      // 클라이언트로부터 '새 비밀번호'와 user_id를 전달 받는다. 
      const { newPassword, user_id } = req.body

      // 유저확인, 필요할까(?)

      // 유저가 확인되었다면, 비밀번호를 업데이트 한다
      await Users.update(
        { password: newPassword },
        { where: { id: user_id }}
      )

      res.status(201).json({ message: '비밀번호가 변경 되었습니다!' });
    } catch (err) {
      return res.status(500).json({ message: 'Server Error!' });
    }
  }
};