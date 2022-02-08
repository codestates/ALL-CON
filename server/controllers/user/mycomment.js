const { userAuth } = require('../../middlewares/authorized/userAuth')
const { Articles, Concerts, ConcertComments, ArticleComments } = require('../../models');

module.exports = {
  get: async (req, res) => {
    try {
      // 로그인 인증 검사
      const userInfo = await userAuth(req, res);

      const { pageNum, comment_type } = req.query;

      if(!comment_type || comment_type === 'concert') {

        // 콘서트 게시물인 경우
        /* 페이지 네이션 한 페이지당 3개의 댓글 */ 
        const limit = 3;
        let offset = 0;
        if(pageNum > 1) offset = limit * (pageNum - 1);
        
        /* 페이지 네이션 */ 
        const commentInfo = await ConcertComments.findAndCountAll({ 
          include: [{
            model: Concerts,
            attributes: ['image_concert', 'title']
          }],
          where: { user_id: userInfo.dataValues.id },
          order: [['createdAt','DESC']],
          offset: offset,
          limit: limit
        });
        
        if(commentInfo.count === 0) return res.status(200).json({ data: { concertCommentInfo: [], totalPage: 0, totalConcertComment: 0, commentType: 'concert' }, message: 'Empty Concert Comments!' });
        // if(commentInfo.count === 0) return res.status(200).json({ message: 'Empty My Concert Comments!' });
        // 총 페이지 수
        const totalPage = Math.ceil(commentInfo.count / limit);
        res.status(200).json({ data: { concertCommentInfo: commentInfo.rows, totalPage: totalPage, totalConcertComment: commentInfo.count, commentType: 'concert' }, message: 'My Concert Comments!' });

      } else if(comment_type === 'article') {

         // 콘친 게시물인 경우
        /* 페이지 네이션 한 페이지당 3개의 댓글 */ 
        const limit = 3;
        let offset = 0;
        if(pageNum > 1) offset = limit * (pageNum - 1);
        
        /* 페이지 네이션 */ 
        const commentInfo = await ArticleComments.findAndCountAll({ 
          include: [{
            model: Articles,
            attributes: ['concert_id', 'image', 'title']
          }],
          where: { user_id: userInfo.dataValues.id },
          order: [['createdAt','DESC']],
          offset: offset,
          limit: limit
        });

        // if(commentInfo.count === 0) return res.status(200).json({ message: 'Empty My Article Comments!' });
        if(commentInfo.count === 0) return res.status(200).json({ data: { articleCommentInfo: [], totalPage: 0, totalArticleComment: 0, commentType: 'article' }, message: 'Empty Article Comments!' });
        // 총 페이지 수
        const totalPage = Math.ceil(commentInfo.count / limit);
        res.status(200).json({ data: { articleCommentInfo: commentInfo.rows, totalPage: totalPage, totalArticleComment: commentInfo.count, commentType: 'article' }, message: 'My Article Comments!' });
      }
      
    } catch (err) {
      console.log(err)
      return res.status(500).json({ message: 'Server Error!' });
    }
  }
};