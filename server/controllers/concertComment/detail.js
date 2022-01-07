const { userAuth } = require('../../middlewares/authorized/userAuth')
const { Users, ConcertComments } = require('../../models');

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

      const { content } = req.body;
      const { commentid } = req.params;
      const concertCommentInfo = await ConcertComments.findOne({ where: { id: commentid }})
      
      // 로그인한 유저가 작성한 댓글이 아닐 경우 에러메시지 반환
      if(concertCommentInfo.user_id !== userInfo.id) return res.status(401).json({ message: 'Userinfo Is Not Authorized!' });
      
      await concertCommentInfo.update({ content: content })
      res.status(200).json({ data: { concertCommentInfo: concertCommentInfo }, message: 'Success Edit Comment!' });
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

      const { concertid, commentid } = req.params;
      const concertCommentInfo = await ConcertComments.findOne({ where: { id: commentid }})

      // 로그인한 유저가 작성한 댓글이 아닐 경우 에러메시지 반환
      if(concertCommentInfo.user_id !== userInfo.id) return res.status(401).json({ message: 'Userinfo Is Not Authorized!' });
      
      await concertCommentInfo.destroy();

      res.status(200).json({ message: 'Success Delete Comment!' });
    } catch (err) {
      console.log(err)
      return res.status(500).json({ message: 'Server Error!' });
    }
  }
};