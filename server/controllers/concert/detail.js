const { userAuth } = require('../../middlewares/authorized/userAuth')
const { Concerts } = require('../../models');

module.exports = {
  get: async (req, res) => {
    try {
      // 특정 콘서트의 id
      const { concertid } = req.params;
      // 클라이언트로부터 전달받은 콘서트 id와 일치하는 콘서트를 DB에서 찾는다
      const concertInfo = await Concerts.findOne({ where: { id: concertid } });
      // 만약 일치하는 콘서트가 존재하면, 다음을 실행한다
      if(!concertInfo) return res.status(400).json({ message: 'Bad Request!'})

      let plusView = concertInfo.view + 1;
      await concertInfo.update({ view: plusView })
      res.status(200).json({ data: { concertInfo: concertInfo }, message: 'Concert Detail!' });
    } catch (err) {
      return res.status(500).json({ message: 'Server Error!' });
    }
  }
};