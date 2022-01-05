const { Users } = require('../../models');

module.exports = {
  post: async (req, res) => {
    try {
      const { email, password, username } = req.body;
      // email, password, username 중 하나라도 전달이 되지 않은 경우, 다음을 응답한다
      if(!email || !password || !username) return res.status(400).json({ message: 'Bad Request!' });

      // 만약 email 혹은 username이 이미 존재한다면, 다음을 응답한다
      const userEmailInfo = await Users.findOne({ where: { email: email } });
      const userNameInfo = await Users.findOne({ where: { username: username } });

      if(userEmailInfo) return res.status(409).json({ message: 'Email Is Already Existed!' });
      else if(userNameInfo) return res.status(409).json({ message: 'Username Is Already Existed!' });
      
      // 만약 신청한 email이 존재하지 않는다면, DB users 테이블에 유저 정보 추가한 후 다음을 응답한다
      else {
        Users.create({ email, password, username, sign_method: 'allcon' });
        res.status(201).json({ message: 'Signup Success!' });
      }
    } catch (err) {
      return res.status(500).json({ message: 'Server Error!' });
    }
  }
};