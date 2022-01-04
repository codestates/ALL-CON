module.exports = {
  get: async (req, res) => {
    try {
      res.status(200).json({ message: 'GET : 콘친찾기 게시물 댓글 목록 페이지!' });
    } catch (err) {
      return res.status(500).json({ message: 'Server Error!' });
    }
  },
  post: async (req, res) => {
    try {
      res.status(200).json({ message: 'POST : 콘친찾기 게시물 댓글 작성 요청!' });
    } catch (err) {
      return res.status(500).json({ message: 'Server Error!' });
    }
  }
};