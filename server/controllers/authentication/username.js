module.exports = {
  post: async (req, res) => {
    try {
      res.status(200).json({ message: 'POST : 닉네임 중복확인 요청!' });
    } catch (err) {
      return res.status(500).json({ message: 'Server Error!' });
    }
  }
};