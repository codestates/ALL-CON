module.exports = {
  get: async (req, res) => {
    try {
      res.status(200).json({ message: 'GET : 마이페이지!' });
    } catch (err) {
      return res.status(500).json({ message: 'Server Error!' });
    }
  },
  patch: async (req, res) => {
    try {
      res.status(200).json({ message: 'PATCH : 프로필 수정 요청!' });
    } catch (err) {
      return res.status(500).json({ message: 'Server Error!' });
    }
  },
  delete: async (req, res) => {
    try {
      res.status(200).json({ message: 'DELETE : 회원탈퇴!' });
    } catch (err) {
      return res.status(500).json({ message: 'Server Error!' });
    }
  }
};