const { userAuth } = require('../../middlewares/authorized/userAuth')
const { Concerts } = require('../../models');

module.exports = {
  get: async (req, res) => {
    try {
      // order: 조회수(view) 혹은 최신순(createdAt)
      const { order } = req.query;

      // 만약 최신순 정렬이라면, 다음을 실행한다
      if(order === 'new') {
        const concertInfo = await Concerts.findAll({ 
          attributes: ['exclusive', 'open_date', 'post_date', 'image_concert', 'title', 'place', 'view'],
          order: [['createdAt','DESC'], ['view', 'DESC']] 
        })
        res.status(200).json({ data: { concertInfo: concertInfo }, message: '콘서트 최신순!' });
      } 
      // 만약 티켓오픈일 임박순 정렬이라면, 다음을 실행한다
      else if(order === 'near') {
        const concertInfo = await Concerts.findAll({ 
          attributes: ['exclusive', 'open_date', 'post_date', 'image_concert', 'title', 'place', 'view'],
          order: [['open_date','ASC'], ['view', 'DESC']] 
        })
        res.status(200).json({ data: { concertInfo: concertInfo }, message: '콘서트 임박순!' });
      }
      // 만약 그외의 경우엔 조회수 순 정렬 (Default)
      else {
        const concertInfo = await Concerts.findAll({ 
          attributes: ['exclusive', 'open_date', 'post_date', 'image_concert', 'title', 'place', 'view'],
          order: [['view','DESC'], ['createdAt', 'DESC']] 
        })
        res.status(200).json({ data: { concertInfo: concertInfo }, message: '콘서트 조회수순!' });
      }      
    } catch (err) {
      console.log(err)
      return res.status(500).json({ message: 'Server Error!' });
    }
  }
};