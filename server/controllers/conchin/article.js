module.exports = {
  get: async (req, res) => {
    try {
      res.status(200).json({ message: 'GET : 특정 콘서트 콘친찾기 게시글 페이지!' });
    } catch (err) {
      return res.status(500).json({ message: 'Server Error!' });
    }
  },
  post: async (req, res) => {
    try {
      res.status(200).json({ message: 'POST : 특정 콘서트 콘친찾기 게시글 작성 요청!' });
    } catch (err) {
      return res.status(500).json({ message: 'Server Error!' });
    }
  }
};