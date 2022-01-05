module.exports = {
  post: async (req, res) => {
    try {
      res.status(200).json({ message: 'POST : 휴대폰 인증 요청!' });
    } catch (err) {
      return res.status(500).json({ message: 'Server Error!' });
    }
  },
  patch: async (req, res) => {
    try {
      res.status(200).json({ message: 'PATCH : 콘친 인증 수정 요청!' });
    } catch (err) {
      return res.status(500).json({ message: 'Server Error!' });
    }
  }
};