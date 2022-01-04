module.exports = {
  get: async (req, res) => {
    try {
      res.status(200).json({ message: 'GET : 특정 콘서트 콘친찾기 게시글 상세 페이지!' });
    } catch (err) {
      return res.status(500).json({ message: 'Server Error!' });
    }
  },
  patch: async (req, res) => {
    try {
      res.status(200).json({ message: 'PATCH : 특정 콘서트 콘친찾기 게시글 상세 페이지 수정 요청!' });
    } catch (err) {
      return res.status(500).json({ message: 'Server Error!' });
    }
  },
  delete: async (req, res) => {
    try {
      res.status(200).json({ message: 'DELETE : 특정 콘서트 콘친찾기 게시글 상세 페이지 삭제!' });
    } catch (err) {
      return res.status(500).json({ message: 'Server Error!' });
    }
  }
};