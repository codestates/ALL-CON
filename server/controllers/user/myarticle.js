const { userAuth } = require('../../middlewares/authorized/userAuth')
const { Articles } = require('../../models');

module.exports = {
  get: async (req, res) => {
    try {
      /* 로그인 인증 검사 */
      const userInfo = await userAuth(req, res);
      if(!userInfo) return res.status(200).json({ message: 'Unauthorized userInfo!' });

      const { pageNum } = req.query;

      /* 페이지 네이션 한 페이지당 6개의 게시글 */ 
      const limit = 6;
      let offset = 0;
      if(pageNum > 1) offset = limit * (pageNum - 1);
      /* 페이지 네이션 */ 

      const articleInfo = await Articles.findAndCountAll({ 
        where: { user_id: userInfo.dataValues.id },
        order: [['createdAt','DESC'], ['view', 'DESC']],
        offset: offset,
        limit: limit
      });
      
      if(articleInfo.count === 0) return res.status(200).json({ data: { articleInfo: articleInfo.rows, totalPage: 0, totalArticle: 0 }, message: 'Empty My Articles!' });
      // 총 페이지 수
      const totalPage = Math.ceil(articleInfo.count / limit);
      res.status(200).json({ data: { articleInfo: articleInfo.rows, totalPage: totalPage, totalArticle: articleInfo.count }, message: 'My Articles!' });
    } catch (err) {
    return res.status(500).json({ message: 'Server Error!' });
    }
  }
};