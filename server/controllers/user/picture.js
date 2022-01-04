module.exports = {
  patch: async (req, res) => {
    try {
      res.status(200).json({ message: 'PATCH : 프로필 이미지 변경 요청!' });
    } catch (err) {
      return res.status(500).json({ message: 'Server Error!' });
    }
  }
};