const { userAuth } = require('../../middlewares/authorized/userAuth');
const { Users, Articles, ArticleComments } = require('../../models');

module.exports = {
  get: async (req, res) => {
    try {
      const { articleid } = req.params;
      const { pageNum } = req.query;

      /* 페이지네이션 한 페이지당 3개의 댓글 */
      const limit = 3;
      let offset = 0;
      if (pageNum > 1) offset = limit * (pageNum - 1);
      /* 페이지네이션 */

      const articleCommentInfo = await ArticleComments.findAndCountAll({
        include: [
          {
            model: Users,
            attributes: ['username', 'image', 'role'],
          },
        ],
        where: { article_id: articleid },
        order: [['createdAt', 'DESC']],
        offset: offset,
        limit: limit,
      });
      // 댓글이 없을 경우, 다음을 실행한다
      if (articleCommentInfo.count === 0)
        return res
          .status(200)
          .json({
            data: { articleCommentInfo: [] },
            message: 'Empty ArticleComments!',
          });

      await Articles.update(
        { total_comment: articleCommentInfo.count },
        { where: { id: articleid } },
      );
      // 총 페이지 수
      const totalPage = Math.ceil(articleCommentInfo.count / limit);

      res
        .status(200)
        .json({
          data: {
            articleCommentInfo: articleCommentInfo.rows,
            totalPage: totalPage,
          },
          message: 'AticlesComments!',
        });
    } catch (err) {
      console.log(err);
      return res.status(500).json({ message: 'Server Error!' });
    }
  },
  post: async (req, res) => {
    try {
      // 로그인 인증 검사
      const userInfo = await userAuth(req, res);

      const { articleid } = req.params;
      const { content } = req.body;

      // 댓글의 내용이 없다면 생성 불가
      if (!content) return res.status(400).json({ message: 'Bad Request!' });

      // ConcertComments 테이블에 전달받은 데이터로 새로운 행을 생성합니다
      await ArticleComments.create({
        content: content,
        user_id: userInfo.dataValues.id,
        article_id: articleid,
      });

      res.status(201).json({ message: 'Success Create ArticleComment!' });
    } catch (err) {
      return res.status(500).json({ message: 'Server Error!' });
    }
  },
};
