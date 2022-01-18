require('dotenv').config();
const { userAuth } = require('../../middlewares/authorized/userAuth');
const { Users, Articles, Concerts } = require('../../models');

module.exports = {
  get: async (req, res) => {
    try {
      const { concertid } = req.params;
      const { order, pageNum } = req.query;

      /* 페이지 네이션 한 페이지당 6개의 게시글 */
      const limit = 6;
      let offset = 0;
      if (pageNum > 1) offset = limit * (pageNum - 1);
      /* 페이지 네이션 */

      // 만약 최신순 정렬이라면, 다음을 실행한다
      if (order === 'new') {
        const articleInfo = await Articles.findAndCountAll({
          include: [
            {
              model: Concerts,
              attributes: ['activation'],
            },
          ],
          where: { concert_id: concertid },
          order: [
            ['createdAt', 'DESC'],
            ['view', 'DESC'],
          ],
          offset: offset,
          limit: limit,
        });
        // 게시글이 없다면 다음 메시지를 반환한다.
        if (articleInfo.count === 0)
          return res.status(200).json({ data: { articleInfo: [] }, message: 'Article Is Empty!' });
        // 총 페이지 수
        const totalPage = Math.ceil(articleInfo.count / limit);
        res
          .status(200)
          .json({
            data: { articleInfo: articleInfo.rows, totalPage: totalPage },
            message: 'Article Order By New!',
          });
      }
      // 만약 그외의 경우엔 조회수 순 정렬 (Default)
      else {
        const articleInfo = await Articles.findAndCountAll({
          include: [
            {
              model: Concerts,
              attributes: ['activation'],
            },
          ],
          where: { concert_id: concertid },
          order: [
            ['view', 'DESC'],
            ['createdAt', 'DESC'],
          ],
          offset: offset,
          limit: limit,
        });
        // 게시글이 없다면 다음 메시지를 반환한다.
        if (articleInfo.count === 0)
          return res.status(200).json({ data: { articleInfo: [] }, message: 'Article Is Empty!' });
        // 총 페이지 수
        const totalPage = Math.ceil(articleInfo.count / limit);
        res
          .status(200)
          .json({
            data: { articleInfo: articleInfo.rows, totalPage: totalPage },
            message: 'Article Order By View!',
          });
      }
    } catch (err) {
      return res.status(500).json({ message: 'Server Error!' });
    }
  },
  post: async (req, res) => {
    try {
      // 로그인 인증 검사
      const userInfo = await userAuth(req, res);

      const { concertid } = req.params;
      const { title, content, image } = req.body;

      // 일반회원은 게시글 작성 불가
      if (userInfo.dataValues.role === 3) return res.status(401).json({ message: 'UserInfo Is Not Authroized!' });
      // concertid, title 중 하나라도 전달되지 않았다면, 다음을 응답한다
      if (!concertid || !title) return res.status(400).json({ message: 'Bad Request!' });

      // 새로운 콘친찾기 게시글이 작성되었다면, Articles 테이블 생성
      const articleInfo = await Articles.create({
        title: title,
        content: content,
        image: image || process.env.ARTICLE_DEFAULT_IMAGE,
        user_id: Number(userInfo.dataValues.id),
        concert_id: Number(concertid)
      });

      res
        .status(201)
        .json({
          data: { articleInfo: articleInfo },
          message: 'Success Create Article!',
        });
    } catch (err) {
      console.log(err);
      return res.status(500).json({ message: 'Server Error!' });
    }
  },
};
