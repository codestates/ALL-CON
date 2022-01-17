const { userAuth } = require('../../middlewares/authorized/userAuth')
const { Articles, ConcertComments, ArticleComments } = require('../../models');

module.exports = {
  get: async (req, res) => {
    try {
      // 로그인 인증 검사
      const userInfo = await userAuth(req, res);

      const { pageNum, comment_type } = req.query;

      console.log(' ---- comment_type ----', comment_type)

      if(!comment_type || comment_type === 'concert') {

        // 콘서트 게시물인 경우
        /* 페이지 네이션 한 페이지당 3개의 댓글 */ 
        const limit = 3;
        let offset = 0;
        if(pageNum > 1) offset = limit * (pageNum - 1);
        
        /* 페이지 네이션 */ 
        const commentInfo = await ConcertComments.findAndCountAll({ 
          where: { user_id: userInfo.dataValues.id },
          order: [['createdAt','DESC']],
          offset: offset,
          limit: limit
        });
        
        if(commentInfo.count === 0) return res.status(200).json({ message: 'Empty My Concert Comments!' });
        // 총 페이지 수
        const totalPage = Math.ceil(commentInfo.count / limit);
        res.status(200).json({ data: { concertCommentInfo: commentInfo.rows, totalPage: totalPage, totalConcertComment: commentInfo.count, commentType: 'concert' }, message: 'My Articles!' });

      } else if(comment_type === 'article') {

        console.log(' --------- 댓글 타입: article --------- #1')
        
         // 콘친 게시물인 경우
        /* 페이지 네이션 한 페이지당 3개의 댓글 */ 
        const limit = 3;
        let offset = 0;
        if(pageNum > 1) offset = limit * (pageNum - 1);
        
        /* 페이지 네이션 */ 
        const commentInfo = await ArticleComments.findAndCountAll({ 
          include: [{
            model: Articles,
            attributes: ['concert_id']
          }],
          where: { user_id: userInfo.dataValues.id },
          order: [['createdAt','DESC']],
          offset: offset,
          limit: limit
        });
        
        console.log(' --------- 댓글 타입: article --------- #2')

        // if(commentInfo.count === 0) return res.status(200).json({ message: 'Empty My Article Comments!' });
        if(commentInfo.count === 0) return res.status(200).json({ data: { articleCommentInfo: [], totalPage: 0, totalArticleComment: 0, commentType: 'article' }, message: 'Empty Article Comments!' });
        // 총 페이지 수
        const totalPage = Math.ceil(commentInfo.count / limit);
        res.status(200).json({ data: { articleCommentInfo: commentInfo.rows, totalPage: totalPage, totalArticleComment: commentInfo.count, commentType: 'article' }, message: 'My Articles!' });
      }
      
    } catch (err) {
      return res.status(500).json({ message: 'Server Error!' });
    }
  }
};