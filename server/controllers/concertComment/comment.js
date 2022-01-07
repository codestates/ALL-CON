const { userAuth } = require('../../middlewares/authorized/userAuth')
const { Users, ConcertComments, Concerts } = require('../../models');

module.exports = {
  get: async (req, res) => {
    try {
      
      const { concertid } = req.params;
      const { pageNum } = req.body;

      
      /* 페이지네이션 한 페이지당 3개의 게시글 */
      const limit = 3;
      let offset = 0;
      if(pageNum > 1) offset = limit * (pageNum - 1);
      /* 페이지 네이션 */ 
      
      const concertCommentInfo = await ConcertComments.findAndCountAll({
        where: { concert_id: concertid },
        order: [['createdAt','DESC']],
        offset: offset,
        limit: limit
      });

      if(concertCommentInfo.count===0) return res.status(200).json({ message: 'Empty Concert Comments!' });

      // 총 페이지 수
      const totalPage = Math.ceil(concertCommentInfo.count / limit);
      await Concerts.update(
        { total_comment: concertCommentInfo.count },
        { where: { id: concertid } }
      );
      res.status(200).json({ data: { concertCommentInfo: concertCommentInfo.rows, totalPage: totalPage }, message: 'Concert Comments!' });
    } catch (err) {
      return res.status(500).json({ message: 'Server Error!' });
    }
  },
  post: async (req, res) => {
    try {
      // 로그인 인증 검사
      // const userInfo = await userAuth(req, res);

      /* 임시 TEST CODE (삭제예정) */
      // POSTMAN 테스트시 => req.body = { id }
      const userInfo = await Users.findOne({
        where: { id: req.body.id }
      });
      /* 임시 TEST CODE (삭제예정) */

      const { concertid } = req.params;
      const { content } = req.body;

      // 댓글 내용이 없다면 생성 불가
      if(!content) return res.status(400).json({ message: 'Bad Request!' });
      
      // ConcertComments 테이블에 전달받은 데이터로 새로운 행을 생성한다
      await ConcertComments.create({
        content: content,
        user_id: userInfo.id,
        concert_id: concertid
      })
      res.status(201).json({ message: 'Success Create Comment!' });
    } catch (err) {
      console.log(err);
      return res.status(500).json({ message: 'Server Error!' });
    }
  }
};
