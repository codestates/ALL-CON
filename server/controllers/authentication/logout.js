const { userAuth } = require('../../middlewares/authorized/userAuth')

module.exports = {
  post: async (req, res) => {
    try {
      // 쿠키 삭제 (accessToken 값을 null로 전달, cookie의 만료시간을 0으로 설정하여 클라이언트가 쿠키를 바로 만료시키도록 전달)
      res.cookie('accessToken', null, { 
        maxAge: 0,
      });
      // 로그아웃 성공
      return res.status(200).json({ message: 'Logout Success!' });
    } catch (err) {
      console.log(err);
      return res.status(500).json({ message: 'Server Error!' });
    }
  }
};