module.exports = {
  get: async (req, res) => {
    try {
      res.status(200).json({ message: 'GET : 내가 쓴 게시물 페이지!' });
    } catch (err) {
      return res.status(500).json({ message: 'Server Error!' });
    }
  }
};