const { userAuth } = require('../../middlewares/authorized/userAuth')
const { Users, ArticleComments } = require('../../models');

module.exports = {
  patch: async (req, res) => {
    try {
      // 로그인 인증 검사
      // const userInfo = await userAuth(req, res);

      /* 임시 TEST CODE (삭제예정) */
      // POSTMAN 테스트시 => req.body = { id }
      const userInfo = await Users.findOne({
        where: { id: req.body.id }
      });
      /* 임시 TEST CODE (삭제예정) */

      const { concertid, articleid, commentid } = req.params;
      const { content } = req.body;
      // 클라이언트에서 받아온 commentid 와 일치하는 댓글정보를 얻는다
      const articleCommentInfo = await ArticleComments.findOne({ where: { id: commentid }})
      
      // 일치하는 댓글이 없다면 에러메시지 반환
      if(!articleCommentInfo) return res.status(400).json({ message: 'Bad Request!' });
      // 댓글 작성자가 아니라면 에러메시지 반환
      if(articleCommentInfo.user_id !== userInfo.id) return res.status(401).json({ message: 'UserInfo Is Not Authroized!' });
      
      // 댓글 업데이트
      await articleCommentInfo.update({ content: content })
      res.status(200).json({ data: { articleCommentInfo: articleCommentInfo }, message: 'Success Edit ArticleComment!' });
    } catch (err) {
      return res.status(500).json({ message: 'Server Error!' });
    }
  },
  delete: async (req, res) => {
    try {
      // 로그인 인증 검사
      // const userInfo = await userAuth(req, res);

      /* 임시 TEST CODE (삭제예정) */
      // POSTMAN 테스트시 => req.body = { id }
      const userInfo = await Users.findOne({
        where: { id: req.body.id }
      });
      /* 임시 TEST CODE (삭제예정) */

      const { concertid, articleid, commentid } = req.params;
      // 클라이언트에서 받아온 commentid 와 일치하는 댓글정보를 얻는다
      const articleCommentInfo = await ArticleComments.findOne({ where: { id: commentid }})

      // 일치하는 댓글이 없다면 에러메시지 반환
      if(!articleCommentInfo) return res.status(400).json({ message: 'Bad Request!' });
      // 댓글 작성자가 아니라면 에러메시지 반환
      if(articleCommentInfo.user_id !== userInfo.id) return res.status(401).json({ message: 'UserInfo Is Not Authroized!' });

      // 댓글 삭제
      await articleCommentInfo.destroy();
      res.status(200).json({ message: 'Success Delete Comment!' });
    } catch (err) {
      return res.status(500).json({ message: 'Server Error!' });
    }
  }
};