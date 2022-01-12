require('dotenv').config();
const { generateAccessToken, sendAccessToken } = require('../../middlewares/tokenFunction');
const { Users } = require('../../models');
const axios = require('axios');

module.exports = {
  post: async (req, res) => {
    try {
       // 요청이 잘못된 경우, 다음 에러메시지를 반환한다.
      const { authorizationCode } = req.body;
      if (!authorizationCode) return res.status(400).json({ message: 'Bad Request!' });

      /* OAuth 2.0 */
      const redirectUri = `${process.env.CLIENT_ORIGIN}/callbackKakao`;
      const url = `https://kauth.kakao.com/oauth/token?code=${authorizationCode}&client_id=${process.env.KAKAO_CLIENT_ID}&client_secret=${process.env.KAKAO_CLIENT_SECRET}&redirect_uri=${redirectUri}&grant_type=authorization_code`;
      // authorizationCode로 kakao_token 을 받아온다.
      const response = await axios.post(url);
      const { access_token } = response.data;
      
      // kakao_token으로 데이터를 받아온다.
      const kakaoUserInfo = await axios.get(
        'https://kapi.kakao.com/v2/user/me',
        { headers: { Authorization: `Bearer ${access_token}` } }
      );
      // 데이터베이스에 일치하는 데이터가 있는지 확인한다.
      const { email, profile } = kakaoUserInfo.data.kakao_account;
      const userInfo = await Users.findOne({ where: { email } });
      
      /* Users 테이블에 존재하지 않는 email이라면 회원가입 진행 */ 
      if (!userInfo) {
        const createUserInfo = await Users.create({
          email,
          username: profile.nickname,
          image: profile.profile_image_url,
          sign_method: 'kakao'
        });
        // 토큰을 발급하고 쿠키에 저장한다.
        const accssToekn = generateAccessToken(createUserInfo.dataValues);
        sendAccessToken(res, accssToekn);

        return res.status(201).json({ data: { userInfo: createUserInfo }, message: 'Success Kakao SignUp!' });
      }

      /* Users 테이블에 존재하는 email이라면 로그인 진행 */ 
      // 토큰을 발급하고 쿠키에 저장한다.
      const accssToekn = generateAccessToken(userInfo.dataValues);
      sendAccessToken(res, accssToekn);
      res.status(200).json({ data: { userInfo: userInfo }, message: 'Success Kakao Login!' });
    } catch (err) {
      console.log(err);
      return res.status(500).json({ message: 'Server Error!' });
    }
  }
};