require('dotenv').config();
const { Users } = require('../../models');
const { ejsHtmlCaller } = require('../../middlewares/ejsHtmlCaller/ejsHtmlCaller.js')
const crypto = require('crypto');

module.exports = {
  post: async (req, res) => {
    try {
      const { email } = req.body;
      // 클라이언트로부터 전달받은 email이 DB에 존재하는지 확인한다
      const userInfo = await Users.findOne({ where: { email: email } });
      // 만약 이메일이 일치하는 유저가 없다면, 다음을 실행한다
      if (!userInfo) return res.status(403).json({ message: 'Invalid Email!' });

      // 6자리 난수 설정
      const max = 999999;
      const min = 100000;
      const confirmNumber = Math.floor(Math.random() * (max - min)) + min;
      // 'sha256' 알고리즘으로 confirmNumber을 'base64' 문자열 형식으로 해싱한다
      const hashedNumber = crypto.createHash('sha256').update(String(confirmNumber)).digest('base64');

      // User 이메일로 인증번호 발송
      await ejsHtmlCaller('passwordFind', email, { confirmNumber })

      // 유저 테이블에 email_key 필드를 업데이트
      await Users.update(
        { email_key: hashedNumber }, // 해싱된 6자리 난수코드 업데이트
        { where: { email: email } },
      );

      // 인증번호 입력 시간이 지나면, email_key 다시 expired로 변경한다 (email_key !== 'success')
      setTimeout(async () => {
        const emailKeyChecker = await Users.findOne({
          where: { email: email },
        });
        if (emailKeyChecker.email_key !== 'success') {
          await Users.update(
            { email_key: 'expired' },
            { where: { email: email } },
          );
        }
      }, 60000);

      res.status(200).json({ message: 'Success Email Send!' });
    } catch (err) {
      console.log(err)
      return res.status(500).json({ message: 'Server Error!' });
    }
  },
};
