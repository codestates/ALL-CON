const { userAuth } = require('../../middlewares/authorized/userAuth')

module.exports = {
  post: async (req, res) => {
    try {

      console.log('---- 로그아웃 진입 완료 ----')

      // 로그인 인증검사
      const token = await userAuth(req, res);
      // 쿠키 삭제
      res.cookie('accessToken', null, { maxAge: 0 });
      // 로그아웃 성공
      res.status(200).json({ message: 'Logout Success!' });
    } catch (err) {
      return res.status(500).json({ message: 'Server Error!' });
    }
  }
};