module.exports = {
  patch: async (req, res) => {
    try {
      res.status(200).json({ message: 'PATCH : 콘친찾기 게시물 댓글 수정 요청!' });
    } catch (err) {
      return res.status(500).json({ message: 'Server Error!' });
    }
  },
  delete: async (req, res) => {
    try {
      res.status(200).json({ message: 'POST : 콘친찾기 게시물 댓글 삭제!' });
    } catch (err) {
      return res.status(500).json({ message: 'Server Error!' });
    }
  }
};