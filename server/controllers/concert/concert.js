const { userAuth } = require('../../middlewares/authorized/userAuth');
const { Concerts } = require('../../models');

module.exports = {
  get: async (req, res) => {
    try {
      // order: 조회수(view), 최신순(new), 임박순(near)
      const { order } = req.query;

      // 만약 최신순 정렬이라면, 다음을 실행한다
      if (order === 'new') {
        const concertInfo = await Concerts.findAll({
          attributes: [
            'id',
            'activation',
            'exclusive',
            'open_date',
            'post_date',
            'image_concert',
            'title',
            'place',
            'view',
          ],
          order: [
            ['post_date', 'DESC'],
            ['view', 'DESC']
          ],
          // where: { activation: true },
        });
        res.status(200).json({ data: { concertInfo: concertInfo }, message: 'Concerts Order By New!' });
      }
      // 만약 티켓오픈일 임박순 정렬이라면, 다음을 실행한다
      else if (order === 'near') {
        const concertInfo = await Concerts.findAll({
          attributes: [
            'id',
            'activation',
            'exclusive',
            'open_date',
            'post_date',
            'image_concert',
            'title',
            'place',
            'view',
          ],
          order: [
            ['activation', 'DESC'],
            ['open_date', 'ASC'],
            ['view', 'DESC'],
          ],
          // where: { activation: true },
        });
        res.status(200).json({ data: { concertInfo: concertInfo }, message: 'Concerts Order By Near!' });
      }
      // 만약 그외의 경우엔 조회수 순 정렬 (Default)
      else {
        const concertInfo = await Concerts.findAll({
          attributes: [
            'id',
            'activation',
            'exclusive',
            'open_date',
            'post_date',
            'image_concert',
            'title',
            'place',
            'view',
          ],
          order: [['view', 'DESC']],
          // where: { activation: true },
        });
        res.status(200).json({ data: { concertInfo: concertInfo }, message: 'Concerts Order By View!' });
      }
    } catch (err) {
      return res.status(500).json({ message: 'Server Error!' });
    }
  },
};
