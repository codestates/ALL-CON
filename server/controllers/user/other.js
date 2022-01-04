module.exports = {
  get: async (req, res) => {
    try {
      res.status(200).json({ message: 'GET : 타 유저 정보 조회!' });
    } catch (err) {
      return res.status(500).json({ message: 'Server Error!' });
    }
  }
};