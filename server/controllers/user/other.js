const { other } = require('.');
const { userAuth } = require('../../middlewares/authorized/userAuth')
const { Users } = require('../../models');

module.exports = {
  get: async (req, res) => {
    try {
      // 로그인 인증 검사
      // const userInfo = await userAuth(req, res);

      /* 임시 TEST CODE (삭제예정) */
      // POSTMAN 테스트시 => req.body = { id, email }
      const userInfo = req.body; 
      /* 임시 TEST CODE (삭제예정) */
      
      // 요청 params로 userid를 받는다.
      const { userid } = req.params;
      const today = new Date();

      // 대상 유저
      const otherInfo = await Users.findOne({ 
        where: { id: userid },
        attributes: ['email', 'username', 'image', 'introduction', 'birth', 'gender', 'role', 'createdAt']
      });
      

      const transformInfo = {
        // testMail@naver.com => te******@naver.com
        'email': otherInfo.email.toString().replace(new RegExp('.(?=.{0,' + (otherInfo.email.toString().split('@')[0].length - 3) + '}@)', 'g'), '*'),
        'username': otherInfo.username,
        'image': otherInfo.image,
        'introduction': otherInfo.introduction,
        'birth': today.getFullYear() - Number(otherInfo.birth.substring(0,4)) + 1 + '살',
        'createdAt': otherInfo.createdAt.getFullYear() + '년 ' + Number(otherInfo.createdAt.getMonth()+1) + '월 ' + otherInfo.createdAt.getDate() + '일'
      };

      if(otherInfo.role!==3) return res.status(200).json({ data: { userInfo: transformInfo }, message: 'Search Other UserInfo!' });
    } catch (err) {
      console.log(err);
      return res.status(500).json({ message: 'Server Error!' });
    }
  }
};