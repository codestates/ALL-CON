const { userAuth } = require('../../middlewares/authorized/userAuth')
const { Articles } = require('../../models');

module.exports = {
  get: async (req, res) => {
    try {

      const { articleid } = req.params;
      // 클라이언트로부터 전달된, 게시물 id와 일치하는 게시물이 있는지 DB에서 찾는다
      const articleInfo = await Articles.findOne({ where: { id: articleid }})
      // 만약 일치하는 게시물이 있다면, 다음을 실행한다 
      if(articleInfo) {
        // 해당 게시물의 조회수가 +1 된다
        let plusView = articleInfo.view + 1;
        await articleInfo.update({ view: plusView })
        res.status(200).json({ data: { articleInfo: articleInfo }, message: '(콘친) 게시물을 조회합니다!'})
      }
      // 만약 일치하는 게시물이 존재하지 않는다면, 다음을 실행한다
      else res.status(400).json({ message: '(콘친) 게시물을 찾을 수 없습니다!'})

    } catch (err) {
      return res.status(500).json({ message: 'Server Error!' });
    }
  },
  patch: async (req, res) => {
    try {
      
      const { articleid } = req.params;
      const { title, content, image, member_count, total_member } = req.body;
      
      // 유저를 확인하다

      // 유저가 확인되면, 클라이언트로부터 전달된 게시물 id로 DB에서 해당 게시물을 찾는다
      const articleInfo = await Articles.findOne({ where: { id: articleid }})
      // 만약 게시물이 존재하면, 다음을 실행한다
      if(articleInfo) {
        // 클라이언트로부터 전달받은 정보로 게시물 데이터를 변경한다
        articleInfo.update({ 
          title: title,
          content: content,
          image: image,
          member_count: member_count,
          total_member: total_member
        })
        res.status(200).json({ data: { articleInfo: articleInfo }, message: '(콘친) 게시물을 수정했습니다!'})
      } 
      // 일치하는 게시물이 존재하지 않을 경우, 다음을 실행한다
      else res.status(400).json({ message: '(콘친) 게시물을 찾을 수 없어요!'})

    } catch (err) {
      return res.status(500).json({ message: 'Server Error!' });
    }
  },
  delete: async (req, res) => {
    try {

      const { articleid } = req.params;

      // 유저를 확인한다

      // 권한을 가진 유저라면, 클라이언트로부터 전달받은 게시물 id와 일치하는 게시물을 DB에서 찾는다
      const articleInfo = await Articles.findOne({ where : { id: articleid }})

      if(articleInfo) {
        Articles.destroy({ where: { id: articleid }})
        res.status(200).json({ message: '(콘친) 게시물을 성공적으로 삭제했습니다!' });
      } else res.status(400).json({ message: '(콘친) 게시물을 찾을 수 없습니다!'})
      
    } catch (err) {
      return res.status(500).json({ message: 'Server Error!' });
    }
  }
};