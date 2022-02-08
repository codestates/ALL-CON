const { Users } = require('../../models');

module.exports = {
  post: async (req, res) => {
    try {
      // username 요청바디
      const { username } = req.body;

      // 요청 바디에 username이 없다면, 에러메시지 반환
      if(!username) return res.status(400).json({ message: 'Bad Request!' });
      
      // 요청 바디에 username이 있다면, 이미 해당 username이 존재하는지 검사
      const usernameInfo = await Users.findOne({ where: { username: username } });

      // 이미 존재하는 username 여부에 따라 응답값 반환
      if(usernameInfo) {
        return res.status(200).json({ state: false, message: 'Username Is Already Existed!' });
      } else {
        return res.status(200).json({ state : true, message: 'Username Is Not Existed!' });
      }
    } catch (err) {
      return res.status(500).json({ message: 'Server Error!' });
    }
  }
};
