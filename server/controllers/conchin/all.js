const { Articles } = require('../../models');

module.exports = {
  get: async (req, res) => {
    try {
      // order: 조회수(view) 혹은 최신순(createdAt)
      const { order } = req.query;

      // 만약 최신순 정렬이라면, 다음을 실행한다
      if(order === 'new') {
        const articleInfo = await Articles.findAll({ order: [['createdAt','DESC'], ['view', 'DESC']] })
        res.status(200).json({ data: { articleInfo: articleInfo }, message: '게시물 최신순!' });
      } 
      // 만약 그외의 경우엔 조회수 순 정렬 (Default)
      else {
        const articleInfo = await Articles.findAll({ order: [['view','DESC'], ['createdAt', 'DESC']] })
        res.status(200).json({ data: { articleInfo: articleInfo }, message: '게시물 조회수순!' });
      }
    } catch (err) {
      return res.status(500).json({ message: 'Server Error!' });
    }
  }
};