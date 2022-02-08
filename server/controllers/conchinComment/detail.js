const { userAuth } = require('../../middlewares/authorized/userAuth')
const { Articles, ArticleComments } = require('../../models');

module.exports = {
  patch: async (req, res) => {
    try {
      // 로그인 인증 검사
      const userInfo = await userAuth(req, res);

      const { commentid } = req.params;
      const { content } = req.body;
      
      // 클라이언트에서 받아온 commentid 와 일치하는 댓글정보를 얻는다
      const articleCommentInfo = await ArticleComments.findOne({ where: { id: commentid }})
      
      // 일치하는 댓글이 없다면 에러메시지 반환
      if(!articleCommentInfo) return res.status(400).json({ message: 'Bad Request!' });
      // 댓글 작성자가 아니라면 에러메시지 반환
      if(articleCommentInfo.user_id !== userInfo.dataValues.id) return res.status(401).json({ message: 'UserInfo Is Not Authorized!' });
      
      // 댓글 업데이트
      await articleCommentInfo.update({ content: content });
      res.status(200).json({ data: { articleCommentInfo: articleCommentInfo }, message: 'Success Edit Article Comment!' });
    } catch (err) {
      return res.status(500).json({ message: 'Server Error!' });
    }
  },
  delete: async (req, res) => {
    try {
      // 로그인 인증 검사
      const userInfo = await userAuth(req, res);

      const { articleid, commentid } = req.params;
      const articleInfo = await Articles.findOne({ where: { id: articleid }});
      const articleCommentInfo = await ArticleComments.findOne({ where: { id: commentid }})

      // 관리자 경우, 다음을 실행한다
      if(userInfo.dataValues.role === 1) {
        // articleInfo의 total_comment - 1
        const minusTotalComment = articleInfo.total_comment - 1;
        await articleInfo.update({ total_comment: minusTotalComment });
        // 댓글 삭제 & 메시지 반환
        articleCommentInfo.destroy({ where: { id: Number(commentid) } });  // 댓글 삭제
        res.status(200).json({ message: 'Success Delete Comment!' });
      }
      // 일반 유저일 경우, 다음을 실행한다
      else {
        // 타인이 작성한 댓글 삭제 불가
        if(articleCommentInfo.user_id !== userInfo.dataValues.id) return res.status(401).json({ message: 'Not Authroized!' });
        // articleInfo의 total_comment - 1
        const minusTotalComment = articleInfo.total_comment - 1;
        await articleInfo.update({ total_comment: minusTotalComment });
        // 댓글 삭제 & 메시지 반환
        articleCommentInfo.destroy({ where: { id: Number(commentid) } });  // 댓글 삭제
        res.status(200).json({ message: 'Success Delete Comment!' });
      }
    } catch (err) {
      return res.status(500).json({ message: 'Server Error!' });
    }
  }
};