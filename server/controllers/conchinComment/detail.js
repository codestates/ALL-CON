const { userAuth } = require('../../middlewares/authorized/userAuth')
const { ArticleComments } = require('../../models');

module.exports = {
  patch: async (req, res) => {
    try {
      const { content } = req.body;
      const { articleid, commentid } = req.params;

      // 유저확인 

      // 유저가 확인되었으면 해당 댓글을 찾는다
      const articleCommentInfo = await ArticleComments.findOne({ where: { id: commentid }})
      // 댓글이 확인되엇으면, 댓글 수정하기
      if(articleCommentInfo) {
        await articleCommentInfo.update({ content: content })
        res.status(200).json({ data: { articleCommentInfo: articleCommentInfo }, message: '댓글을 성공적으로 수정했습니다!' });
      }
      // 일치하는 댓글이 없을 경우, 다음을 실행한다
      else res.status(400).json({ message: '댓글을 찾을 수 없습니다!' });

    } catch (err) {
      return res.status(500).json({ message: 'Server Error!' });
    }
  },
  delete: async (req, res) => {
    try {
      const { concertid, commentid } = req.params;

      // 유저확인 

      // 유저가 확인되엇으면, 댓글 삭제하기
      await ArticleComments.destroy({ where: { id: commentid } })

      res.status(200).json({ message: '댓글을 성공적으로 삭제했습니다!' });
    } catch (err) {
      return res.status(500).json({ message: 'Server Error!' });
    }
  }
};