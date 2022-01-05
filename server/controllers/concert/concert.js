module.exports = {
  get: async (req, res) => {
    try {
      res.status(200).json({ message: 'GET : 콘서트페이지!' });
    } catch (err) {
      return res.status(500).json({ message: 'Server Error!' });
    }
  }
};