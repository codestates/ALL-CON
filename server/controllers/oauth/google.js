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
      const redirectUri = `${process.env.CLIENT_ORIGIN}/callbackGoogle`;
      const url = `https://www.googleapis.com/oauth2/v4/token?code=${authorizationCode}&client_id=${process.env.GOOGLE_CLIENT_ID}&client_secret=${process.env.GOOGLE_CLIENT_SECRET}&redirect_uri=${redirectUri}&grant_type=authorization_code`;
      // authorizationCode로 google_token 을 받아온다.
      const response = await axios.post(url);
      const { access_token } = response.data;
      
      // google_token으로 데이터를 받아온다.
      const googleUserInfo = await axios.get(
        'https://www.googleapis.com/oauth2/v1/userinfo',
        { headers: { Authorization: `Bearer ${access_token}` } }
      );
      // 데이터베이스에 일치하는 데이터가 있는지 확인한다.
      const { email, given_name, picture } = googleUserInfo.data;
      const userInfo = await Users.findOne({ where: { email } });
      
      /* Users 테이블에 존재하지 않는 email이라면 회원가입 진행 */ 
      if (!userInfo) {
        let newUsername = given_name;

        /* 닉네임 중복확인 (고유 닉네임 찾을때까지 무한루프)*/
        while(true){
          const isValidUsernameInfo = await Users.findOne({ where: { username: newUsername } });
          /* 해당 닉네임이 중복되지 않았다면 반복문 탈출 */
          if(!isValidUsernameInfo){
            break;
          } else {
            /* 해당 닉네임이 중복이라면 아래 코드 실행 */
            // 1000~9999 4자리 난수 설정
            const max = 9999;
            const min = 1000;
            const tag = Math.floor(Math.random() * (max - min)) + min;

            // 6자리 난수 태그 추가
            newUsername = `${newUsername}#${tag}`;
          }
        }

        const createUserInfo = await Users.create({
          email,
          username: newUsername,
          image: picture,
          sign_method: 'google'
        });
        // 토큰을 발급하고 쿠키에 저장한다.
        const accssToekn = generateAccessToken(createUserInfo.dataValues);
        sendAccessToken(res, accssToekn);

        return res.status(201).json({ data: { userInfo: createUserInfo }, message: 'Success Google SignUp!' });
      }

      /* Users 테이블에 존재하는 email이라면 로그인 진행 */ 
      // 토큰을 발급하고 쿠키에 저장한다.
      const accssToekn = generateAccessToken(userInfo.dataValues);
      sendAccessToken(res, accssToekn);
      res.status(200).json({ data: { userInfo: userInfo }, message: 'Success Google Login!' });
    } catch (err) {
      console.log(err);
      return res.status(500).json({ message: 'Server Error!' });
    }
  }
};