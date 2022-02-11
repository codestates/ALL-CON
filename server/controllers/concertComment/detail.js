const { userAuth } = require('../../middlewares/authorized/userAuth')
const { Concerts, ConcertComments } = require('../../models');

module.exports = {
  patch: async (req, res) => {
    try {
      /* 로그인 인증 검사 */
      const userInfo = await userAuth(req, res);
      if(!userInfo) return res.status(200).json({ message: 'Unauthorized userInfo!' });

      const { content } = req.body;
      const { commentid } = req.params;

      // content가 전달되지 않았을 때, 다음을 응답한다
      if(!content) return res.status(400).json({ message: 'Bad Request!' })
      const concertCommentInfo = await ConcertComments.findOne({ where: { id: commentid }});
      
      // 로그인한 유저가 작성한 댓글이 아닐 경우 에러메시지 반환
      if(concertCommentInfo.user_id !== userInfo.id) return res.status(401).json({ message: 'Userinfo Is Not Authorized!' });
      
      await concertCommentInfo.update({ content: content });
      res.status(200).json({ data: { concertCommentInfo: concertCommentInfo }, message: 'Success Edit Comment!' });
    } catch (err) {
      return res.status(500).json({ message: 'Server Error!' });
    }
  },
  delete: async (req, res) => {
    try {
      /* 로그인 인증 검사 */
      const userInfo = await userAuth(req, res);
      if(!userInfo) return res.status(200).json({ message: 'Unauthorized userInfo!' });

      const { concertid, commentid } = req.params;
      const concertInfo = await Concerts.findOne({ where: { id: concertid }});
      const concertCommentInfo = await ConcertComments.findOne({ where: { id: commentid }});

      if(userInfo.dataValues.role === 1) {
        // concertInfo의 total_comment - 1
        const minusTotalComment = concertInfo.total_comment - 1;
        await concertInfo.update({ total_comment: minusTotalComment });
        // 댓글 삭제 & 메시지 반환
        ConcertComments.destroy({ where: { id: Number(commentid) } });  // 댓글 삭제
        res.status(200).json({ message: 'Success Delete Comment!' });
      }
      // 일반 유저일 경우, 다음을 실행한다
      else {
        // 타인이 작성한 댓글 삭제 불가
        if(concertCommentInfo.user_id !== userInfo.dataValues.id) return res.status(401).json({ message: 'Not Authorized!' });
        // concertInfo의 total_comment - 1
        const minusTotalComment = concertInfo.total_comment - 1;
        await concertInfo.update({ total_comment: minusTotalComment });
        // 댓글 삭제 & 메시지 반환
        ConcertComments.destroy({ where: { id: Number(commentid) } });  // 댓글 삭제
        res.status(200).json({ message: 'Success Delete Comment!' });
      }
    } catch (err) {
      console.log(err)
      return res.status(500).json({ message: 'Server Error!' });
    }
  }
};