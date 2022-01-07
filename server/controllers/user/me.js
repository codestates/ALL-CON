const { userAuth } = require('../../middlewares/authorized/userAuth')
const { Users, Alarms, ArticleComments, Articles, ConcertComments } = require('../../models');
const { Op } = require('sequelize');

module.exports = {
  get: async (req, res) => {
    try {
      // 로그인 인증 검사
      // const userInfo = await userAuth(req, res);

      /* 임시 TEST CODE (삭제예정) */
      // POSTMAN 테스트시 => req.body = { id }
      const userInfo = await Users.findOne({
        where: { id: req.body.id }
      });
      /* 임시 TEST CODE (삭제예정) */

      // 회원의 민감정보(비밀번호) 삭제
      delete userInfo.dataValues.password;

      // 회원정보 반환
      res.status(200).json({ data: { userInfo: userInfo }, message: 'Welcome Mypage!' });
    } catch (err) {
      return res.status(500).json({ message: 'Server Error!' });
    }
  },
  patch: async (req, res) => {
    try {
      // 로그인 인증 검사
      // const userInfo = await userAuth(req, res);

      /* 임시 TEST CODE (삭제예정) */
      // POSTMAN 테스트시 => req.body = { id }
      const userInfo = await Users.findOne({
        where: { id: req.body.id }
      });
      /* 임시 TEST CODE (삭제예정) */

      const { username, introduction, password } = req.body;

      /* 임시 TEST CODE (닉네임 중복 API가 정상 작동한다면 삭제예정) */
      // 요청 바디에 username이 있다면, 나를 제외한 username 중 이미 존재하는지 검사
      if(username) {
        const usernameInfo = await Users.findOne({ 
          where: { 
            username: username,
            [Op.not]: [{ id: userInfo.id }]
          }
        });
        // 이미 존재하는 username이면 요청 거절
        if(usernameInfo) return res.status(409).json({ message: 'Username Is Already Existed!' });
      }
      /* 임시 TEST CODE (닉네임 중복 API가 정상 작동한다면 삭제예정) */

      // 요청 바디가 없는 값은 그대로 유지, 있다면 새로 업데이트 한다
      await Users.update(
        {
          username: username ? username : userInfo.username,
          introduction: introduction ? introduction : userInfo.introduction,
          password: password
        },
        { where : { id: userInfo.id } }
      );

      // 새로 업데이트한 회원정보 조회 후 민감정보(비밀번호) 삭제
      const newUserInfo = await Users.findOne({ where: { id: userInfo.id } });
      delete newUserInfo.dataValues.password;
      
      // 업데이트된 회원정보 반환
      res.status(200).json({ data: { userInfo: newUserInfo }, message: 'Updated Success!' });
    } catch (err) {
      return res.status(500).json({ message: 'Server Error!' });
    }
  },
  delete: async (req, res) => {
    try {
      // 로그인 인증 검사
      // const userInfo = await userAuth(req, res);

      /* 임시 TEST CODE (삭제예정) */
      // POSTMAN 테스트시 => req.body = { id }
      const userInfo = await Users.findOne({
        where: { id: req.body.id }
      });
      /* 임시 TEST CODE (삭제예정) */

      // 종속된 하위 테이블 역순으로 삭제
      Alarms.destroy({ where: { user_id: userInfo.id } });  // 알람 삭제
      ArticleComments.destroy({ where: { user_id: userInfo.id } });  // 콘친찾기 댓글 삭제
      Articles.destroy({ where: { user_id: userInfo.id } });  // 콘친찾기 게시물 삭제
      ConcertComments.destroy({ where: { user_id: userInfo.id } });  // 콘서트 댓글 삭제
      Users.destroy({ where: { email: userInfo.email } });  // 유저 삭제

      res.cookie('accessToken', null, { maxAge: 0 });  // 쿠키 삭제
      res.status(200).json({ message: 'Goodbye!' });
    } catch (err) {
      console.log(err);
      return res.status(500).json({ message: 'Server Error!' });
    }
  }
};