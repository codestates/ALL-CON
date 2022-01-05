const { userAuth } = require('../../middlewares/authorized/userAuth')
const { Articles } = require('../../models');

module.exports = {
  get: async (req, res) => {
    try {
      const { concertid } = req.params;
      // order: 조회수(view) 혹은 최신순(createdAt)
      const { order } = req.query;

      // 만약 최신순 정렬이라면, 다음을 실행한다
      if(order === 'new') {
        const articleInfo = await Articles.findAll({ 
          where: { concert_id: concertid },
          order: [['createdAt','DESC'], ['view', 'DESC']] 
        });
        res.status(200).json({ data: { articleInfo: articleInfo }, message: '게시물 최신순!' });
      } 
      // 만약 그외의 경우엔 조회수 순 정렬 (Default)
      else {
        const articleInfo = await Articles.findAll({ 
          where: { concert_id: concertid },
          order: [['view','DESC'], ['createdAt', 'DESC']] 
        });
        res.status(200).json({ data: { articleInfo: articleInfo }, message: '게시물 조회수순!' });
      }
    } catch (err) {
      return res.status(500).json({ message: 'Server Error!' });
    }
  },
  post: async (req, res) => {
    try {
      // 로그인 인증 검사
      // const userInfo = await userAuth(req, res);

      /* 임시 TEST CODE (삭제예정) */
      // POSTMAN 테스트시 => req.body = { id, email, role }
      const userInfo = req.body; 
      /* 임시 TEST CODE (삭제예정) */
      const { concertid } = req.params;
      const { title, content, image } = req.body;

      // 일반회원은 게시글 작성 불가
      if(userInfo.role === 3) return res.status(401).json({ message: 'Not Authroized!' });
      // concertid, title 중 하나라도 전달되지 않았다면, 다음을 응답한다
      if(!concertid || !title ) return res.status(400).json({ message: 'Bad Request!' });

      // 새로운 콘친찾기 게시글이 작성되었다면, Articles 테이블 생성
      const articleInfo = await Articles.create({ 
        title: title, 
        content: content, 
        image: image,
        user_id: Number(userInfo.id), 
        concert_id: Number(concertid) 
      });

      res.status(201).json({ data: { articleInfo: articleInfo }, message: 'Create Article!' });
    } catch (err) {
      console.log(err);
      return res.status(500).json({ message: 'Server Error!' });
    }
  }
};