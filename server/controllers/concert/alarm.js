module.exports = {
  post: async (req, res) => {
    try {
      res.status(200).json({ message: 'POST : 콘서트 알람 요청!' });
    } catch (err) {
      return res.status(500).json({ message: 'Server Error!' });
    }
  },
  delete: async (req, res) => {
    try {
      res.status(200).json({ message: 'DELETE : 콘서트 알람 삭제!' });
    } catch (err) {
      return res.status(500).json({ message: 'Server Error!' });
    }
  }
};