const { Articles } = require('../../models');

module.exports = {
  get: async (req, res) => {
    try {
      const { order } = req.query;
      const { pageNum } = req.body;

      /* 페이지 네이션 한 페이지당 6개의 게시글 */ 
      const limit = 6;
      let offset = 0;
      if(pageNum > 1) offset = limit * (pageNum - 1);
      /* 페이지 네이션 */ 

      // 만약 최신순 정렬이라면, 다음을 실행한다
      if(order === 'new') {
        const articleInfo = await Articles.findAndCountAll({ 
          order: [['createdAt','DESC'], ['view', 'DESC']],
          offset: offset,
          limit: limit
        });
        // 총 페이지 수
        const totalPage = Math.ceil(articleInfo.count / limit);
        res.status(200).json({ data: { articleInfo: articleInfo.rows, totalPage: totalPage }, message: '게시물 최신순!' });
      } 
      // 만약 그외의 경우엔 조회수 순 정렬 (Default)
      else {
        const articleInfo = await Articles.findAndCountAll({ 
          order: [['view','DESC'], ['createdAt', 'DESC']],
          offset: offset,
          limit: limit
        });
        // 총 페이지 수
        const totalPage = Math.ceil(articleInfo.count / limit);
        res.status(200).json({ data: { articleInfo: articleInfo.rows, totalPage: totalPage }, message: '게시물 조회수순!' });
      }
    } catch (err) {
      return res.status(500).json({ message: 'Server Error!' });
    }
  }
};