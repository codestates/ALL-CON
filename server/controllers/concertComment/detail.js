const { userAuth } = require('../../middlewares/authorized/userAuth')
const { ConcertComments } = require('../../models');

module.exports = {
  patch: async (req, res) => {
    try {

      const { content } = req.body;
      const { concertid, commentid } = req.params;

      // 유저확인 

      // 유저가 확인되었으면 해당 댓글을 찾는다
      const concertCommentInfo = await ConcertComments.findOne({ where: { id: commentid }})
      // 유저가 확인되엇으면, 댓글 수정하기
      await concertCommentInfo.update({ content: content })

      res.status(200).json({ data: { concertCommentInfo: concertCommentInfo }, message: '댓글을 성공적으로 수정했습니다!' });
    } catch (err) {
      return res.status(500).json({ message: 'Server Error!' });
    }
  },
  delete: async (req, res) => {
    try {

      const { concertid, commentid } = req.params;

      // 유저확인 

      // 유저가 확인되엇으면, 댓글 삭제하기
      await ConcertComments.destroy({ where: { id: commentid } })

      res.status(200).json({ message: '댓글을 성공적으로 삭제했습니다!' });
    } catch (err) {
      console.log(err)
      return res.status(500).json({ message: 'Server Error!' });
    }
  }
};