const { Articles, Concerts, Users } = require('../../models');

module.exports = {
  get: async (req, res) => {
    try {
      const { order, pageNum } = req.query;

      /* 페이지 네이션 한 페이지당 6개의 게시글 */
      const limit = 6;
      let offset = 0;
      if (pageNum > 1) offset = limit * (pageNum - 1);
      /* 페이지 네이션 */

      // 만약 최신순 정렬이라면, 다음을 실행한다 (Users, Cocnerts 조인)
      if (order === 'new') {
        const articleInfo = await Articles.findAndCountAll({
          include: [
            {
              model: Users,
              attributes: ['username', 'image', 'role'],
            },
          ],
          order: [
            ['activation', 'DESC'],
            ['createdAt', 'DESC'],
            ['view', 'DESC']
          ],
          offset: offset,
          limit: limit,
        });
        // 게시글이 없다면 다음 메시지를 반환한다.
        if (articleInfo.count === 0)
          return res
            .status(200)
            .json({ data: { articleInfo: [] }, message: 'Article Is Empty!' });
        // 총 페이지 수
        const totalPage = Math.ceil(articleInfo.count / limit);
        res.status(200).json({
          data: { articleInfo: articleInfo.rows, totalPage: totalPage },
          message: 'Article Order By New!',
        });
      }
      // 만약 그외의 경우엔 조회수 순 정렬 (Users, Cocnerts 조인)
      else {
        const articleInfo = await Articles.findAndCountAll({
          include: [
            {
              model: Users,
              attributes: ['username', 'image', 'role'],
            },
          ],
          order: [
            ['activation', 'DESC'],
            ['view', 'DESC'],
            ['createdAt', 'DESC']
          ],
          offset: offset,
          limit: limit,
        });

        console.log(articleInfo);

        // 게시글이 없다면 다음 메시지를 반환한다.
        if (articleInfo.count === 0)
          return res
            .status(200)
            .json({ data: { articleInfo: [] }, message: 'Article Is Empty!' });
        // 총 페이지 수
        const totalPage = Math.ceil(articleInfo.count / limit);
        res.status(200).json({
          data: { articleInfo: articleInfo.rows, totalPage: totalPage },
          message: 'Article Order By View!',
        });
      }
    } catch (err) {
      console.log(err);
      return res.status(500).json({ message: 'Server Error!' });
    }
  },
};
