const { userAuth } = require('../../middlewares/authorized/userAuth')
const { ConcertComments } = require('../../models');

module.exports = {
  get: async (req, res) => {
    try {
      
      const { concertid } = req.params;
      const { pageNum } = req.body;

      // 해당 콘서트 게시물의 댓글이 있는지 확인한다
      const concertCommentInfoCheck = await ConcertComments.findAll({ where: { concert_id: concertid }})

      // 댓글이 존재하는 경우, 다음을 실행한다
      if(concertCommentInfoCheck) {
        /* 페이지네이션 한 페이지당 3개의 게시글 */
        const limit = 3;
        let offset = 0;
        if(pageNum > 1) offset = limit * (pageNum - 1)

        // 페이지네이션
        const concertCommentInfo = await ConcertComments.findAndCountAll({
          where: { concert_id: concertid },
          order: [['createdAt','DESC']],
          offset: offset,
          limit: limit
        });

        // 총 페이지 수
        const totalPage = Math.ceil(concertCommentInfo.count / limit);
        res.status(200).json({ data: { concertCommentInfo: concertCommentInfo.rows, totalPage: totalPage }, message: '콘서트 게시글 댓글!' })
      }
      // 댓글이 없을 경우, 다음을 실행한다
      else res.status(200).json({ message: '콘서트 게시물에 댓글이 없습니다!' })
   
      
    } catch (err) {
      console.log(err)
      return res.status(500).json({ message: 'Server Error!' });
    }
  },
  post: async (req, res) => {
    try {
      // 댓글내용과 user_id를 클라이언트 측으로부터 전달받는다
      const { content, user_id } = req.body;
      const { concertid } = req.params;
      
      // ConcertComments 테이블에 전달받은 데이터로 새로운 행을 생성합니다
      await ConcertComments.create({
        content: content,
        user_id: user_id,
        concert_id: concertid
      })

      res.status(201).json({ message: '(콘서트) 댓글이 성공적으로 작성됐습니다!' });
    } catch (err) {
      return res.status(500).json({ message: 'Server Error!' });
    }
  }
};
