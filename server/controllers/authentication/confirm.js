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
      res.status(200).json({ message: 'PATCH : 비밀번호 재설정 페이지!' });
    } catch (err) {
      return res.status(500).json({ message: 'Server Error!' });
    }
  }
};