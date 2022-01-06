const { userAuth } = require('../../middlewares/authorized/userAuth')
const { ArticleComments } = require('../../models');

module.exports = {
  get: async (req, res) => {
    try {
      res.status(200).json({ message: 'GET : 콘친찾기 게시물 댓글 목록 페이지!' });
    } catch (err) {
      return res.status(500).json({ message: 'Server Error!' });
    }
  },
  post: async (req, res) => {
    try {
      // 댓글내용과 user_id를 클라이언트 측으로부터 전달받는다
      const { content, user_id } = req.body;
      const { articleid } = req.params;
      
      // ConcertComments 테이블에 전달받은 데이터로 새로운 행을 생성합니다
      await ArticleComments.create({
        content: content,
        user_id: Number(user_id),
        article_id: Number(articleid)
      })

      res.status(201).json({ message: '(콘친 게시물) 댓글이 성공적으로 작성됐습니다!' });
    } catch (err) {
      console.log(err)
      return res.status(500).json({ message: 'Server Error!' });
    }
  }
};