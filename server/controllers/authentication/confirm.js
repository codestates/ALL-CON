const { Users } = require('../../models');

module.exports = {
  post: async (req, res) => {
    try {
      res.status(200).json({ message: 'POST : 비밀번호 찾기 인증번호 확인 요청!' });
    } catch (err) {
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