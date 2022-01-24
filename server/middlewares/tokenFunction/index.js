require('dotenv').config();
const jwt = require('jsonwebtoken');

module.exports = {
  generateAccessToken: (data) => {
    // accessToken으로 sign한다.
    return jwt.sign(data, process.env.ACCESS_SECRET, { expiresIn : '12h' });
  },
  sendAccessToken: (res, accessToken) => {
    // accessToken을 쿠키로 전달한다.
    const cookieOptions = {
      maxAge: 1000 * 60 * 60 * 24 * 7,
      httpOnly: true
    };
    res.cookie('accessToken', accessToken, cookieOptions);
  },
  isAuthorized: (accessToken) => {
    // JWT 토큰 정보를 받아서 검증한다.
    try{
      return jwt.verify(accessToken, process.env.ACCESS_SECRET);
    } catch (err){
      return null;
    }
  }
};