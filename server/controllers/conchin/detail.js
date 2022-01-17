const { userAuth } = require('../../middlewares/authorized/userAuth')
const { Users, Articles } = require('../../models');

module.exports = {
  get: async (req, res) => {
    try {
      const { articleid } = req.params;
      // 클라이언트로부터 전달된, 게시물 id와 일치하는 게시물이 있는지 DB에서 찾는다
      const articleInfo = await Articles.findOne({ where: { id: articleid }})

      // 만약 일치하는 게시물이 존재하지 않는다면, 다음을 실행한다
      if(!articleInfo) return res.status(400).json({ message: 'Bad Request!'})
      
      // 해당 게시물의 조회수가 +1 된다
      let plusView = articleInfo.view + 1;
      await articleInfo.update({ view: plusView })
      res.status(200).json({ data: { articleInfo: articleInfo }, message: 'Article Detail!'})
    } catch (err) {
      return res.status(500).json({ message: 'Server Error!' });
    }
  },
  patch: async (req, res) => {
    try {
      // 로그인 인증 검사
      const userInfo = await userAuth(req, res);

      const { articleid } = req.params;
      const { title, content, image, member_count, total_member } = req.body;
      
      //클라이언트로부터 전달된 게시물 id로 DB에서 해당 게시물을 찾는다
      const articleInfo = await Articles.findOne({ where: { id: articleid }})
      
      if(!articleInfo) return res.status(401).json({ message: 'Bad Request!' });
      // 본인 게시글 외 수정 불가
      if(articleInfo.user_id !== userInfo.dataValues.id) return res.status(401).json({ message: 'UserInfo Is Not Authroized!' });
      
      // 클라이언트로부터 전달받은 정보로 게시물 데이터를 변경한다
      articleInfo.update({ 
        title: title,
        content: content,
        image: image,
        member_count: member_count,
        total_member: total_member
      })
      res.status(200).json({ data: { articleInfo: articleInfo }, message: 'Success Edit Article!'})
    } catch (err) {
      console.log(err);
      return res.status(500).json({ message: 'Server Error!' });
    }
  },
  delete: async (req, res) => {
    try {
      // 로그인 인증 검사
      const userInfo = await userAuth(req, res);

      const { articleid } = req.params;

      // 클라이언트로부터 전달받은 게시물 id와 일치하는 게시물을 DB에서 찾는다
      const articleInfo = await Articles.findOne({ where : { id: articleid }})

      if(!articleInfo) return res.status(401).json({ message: 'Bad Request!' });
      // 본인 게시글 외 수정 불가
      if(articleInfo.user_id !== userInfo.dataValues.id) return res.status(401).json({ message: 'UserInfo Is Not Authroized!' });

      articleInfo.destroy();
      res.status(200).json({ message: 'Success Delete Article!' });
    } catch (err) {
      return res.status(500).json({ message: 'Server Error!' });
    }
  }
};