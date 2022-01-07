const { Users } = require('../../models');
const nodemailer = require('nodemailer');
require('dotenv').config();

module.exports = {
  post: async (req, res) => {
    try {
      
      const { email } = req.body;
      // 클라이언트로부터 전달받은 '이메일'이 DB에 존재하는지 확인한다
      const userInfo = await Users.findOne({ where: { email: email } })
      // 만약 이메일이 일치하는 유저가 없다면, 다음을 실행한다
      if(!userInfo) res.status(400).json({ message: '존재하는 아이디가 없습니다!'})
      else {
        const max = 999999;
        const min = 100000;
        const confirmNumber = Math.floor(Math.random() * (max - min)) + min;

        // 송신 이메일 설정
        const transporter = nodemailer.createTransport({
          service: 'gmail',
          host: 'smtp.gmail.com',
          port: 587,
          secure: false,
          auth: {
            user: `${process.env.GOOGLE_EMAIL}`,
            pass: `${process.env.GOOGLE_PASSWORD}`
          }
        })
        
        // 송신 이메일 포맷 및 내용 설정
        const info = await transporter.sendMail({
          from: `<${process.env.GOOGLE_EMAIL}>`,
          to: `${email}`,
          subject: '[All-Con] 인증번호를 입력해주세요',
          text: `인증번호를 입력해주세요! ${confirmNumber}`
        })

        // 유저 테이블에 email_key 필드를 업데이트
        await Users.update(
          { email_key: confirmNumber.toString() },
          { where: { email: email }}
        )
        
        // 인증번호 입력 시간이 지나면, email_key 다시 expired로 변경한다
        setTimeout(async function() {
          await Users.update(
            { email_key: 'expired' },
            { where: { email: email }}
          )
        }, 60000*2)

        res.status(200).json({ message: 'POST : 인증번호 받기 버튼 클릭!' });
      }
    } catch (err) {
      console.log(err)
      return res.status(500).json({ message: 'Server Error!' });
    }
  }
};