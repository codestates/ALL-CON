const { userAuth } = require('../../middlewares/authorized/userAuth')
const { ArticleComments } = require('../../models');

module.exports = {
  get: async (req, res) => {
    try {
      // 로그인 인증 검사
      // const userInfo = await userAuth(req, res);

      /* 임시 TEST CODE (삭제예정) */
      // POSTMAN 테스트시 => req.body = { id, email }
      const userInfo = req.body; 
      /* 임시 TEST CODE (삭제예정) */
      const { pageNum } = req.body;

      /* 페이지 네이션 한 페이지당 3개의 댓글 */ 
      const limit = 3;
      let offset = 0;
      if(pageNum > 1) offset = limit * (pageNum - 1);
      /* 페이지 네이션 */ 

      const commentInfo = await ArticleComments.findAndCountAll({ 
        where: { user_id: userInfo.id },
        order: [['createdAt','DESC']],
        offset: offset,
        limit: limit
      });
      
      if(commentInfo.count===0) return res.status(200).json({ message: 'Empty My Comments!' });
      // 총 페이지 수
      const totalPage = Math.ceil(commentInfo.count / limit);
      res.status(200).json({ data: { commentInfo: commentInfo.rows, totalPage: totalPage }, message: 'My Articles!' });
    } catch (err) {
      return res.status(500).json({ message: 'Server Error!' });
    }
  }
};