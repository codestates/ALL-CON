require('dotenv').config();
const { generateAccessToken, sendAccessToken } = require('../../middlewares/tokenFunction');
const { Users } = require('../../models');
const axios = require('axios');

module.exports = {
  post: async (req, res) => {
    try {
       // 요청이 잘못된 경우, 다음 에러메시지를 반환한다.
      const { authorizationCode } = req.query;
      if (!authorizationCode) return res.status(400).json({ message: 'Bad Request!' });
      /* OAuth 2.0 */
      // 구글 Oauth EndPoint
      const googleEndPoint = 'https://oauth2.googleapis.com/token'; 
      const redirect_uri = CLIENT_ORIGIN;
      const url = `${googleEndPoint}?code=${authorizationCode}&client_id=${process.env.GOOGLE_CLIENT_ID}&client_secret=${process.env.GOOGLE_CLIENT_SECRET}$redirect_url=${redirect_uri}$grant_type=authorization_code`;

      // authorizationCode로 google_token 을 받아온다.
      const response = await axios.post(url);
      const { access_token } = response.data;

      // google_token으로 데이터를 받아온다.
      const googleUserInfo = await axios.get(
        'https://www.googleapis.com/oauth2/v1/userinfo',
        { headers: { Authorization: `Bearer ${access_token}` } }
      );

      // 데이터베이스에 일치하는 데이터가 있는지 확인한다.
      const { email, name, given_name, picture } = googleUserInfo.data;
      const userInfo = await Users.findOne({ where: { email } });
      
      /* Users 테이블에 존재하지 않는 email이라면 회원가입 진행 */ 
      if (!userInfo) {
        const createUserInfo = await Users.create({
          email,
          username: `${name}${given_name}`,
          image: picture,
          signup_method: 'google'
        });

        // 회원의 비밀번호와 이메일 인증 코드를 삭제한다.
        delete createUserInfo.dataValues.password;
        delete createUserInfo.dataValues.key_for_verify;

        // 토큰을 발급하고 쿠키에 저장한다.
        const accssToekn = generateAccessToken(createUserInfo.dataValues);
        sendAccessToken(res, accssToekn);

        return res.status(201).json({ data: { userInfo: newUserInfo }, message: 'Success Google SignUp!' });
      }

      /* Users 테이블에 존재하는 email이라면 로그인 진행 */ 
      // 회원의 비밀번호와 이메일 인증 코드를 삭제한다.
      delete userInfo.dataValues.password;
      delete userInfo.dataValues.key_for_verify;

      // 토큰을 발급하고 쿠키에 저장한다.
      const accssToekn = generateAccessToken(userInfo.dataValues);
      sendAccessToken(res, accssToekn);
      res.status(200).json({ data: { userInfo: newUserInfo }, message: 'Success Google Login!' });
    } catch (err) {
      console.log(err);
      return res.status(500).json({ message: 'Server Error!' });
    }
  }
};