const { userAuth } = require('../../middlewares/authorized/userAuth');
const { Users, Concerts, Alarms } = require('../../models');

module.exports = {
  post: async (req, res) => {
    try {
      // 로그인 인증 검사
      const userInfo = await userAuth(req, res);

      // 특정 콘서트 id를 클라이언트로부터 전달받는다
      const { concertid } = req.params;
      // 유저확인 및 알람종류 확인
      const { alarm_type } = req.query;
      const concertInfo = await Concerts.findOne({ where: { id: concertid } });

      // 존재하지 않는다면, 다음을 실행한다
      if (!concertInfo)
        res.status(400).json({ message: '콘서트가 존재하지 않습니다!' });
      // 존재한다면, 다음을 실행한다
      else {
        // 이메일 알람이면, 다음을 실행한다
        if (alarm_type === 'email') {
          const alarmInfo = await Alarms.create({
            email_alarm: true,
            user_id: userInfo.dataValues.id,
            concert_id: concertid,
          });

          return res
            .status(201)
            .json({
              data: { alarmInfo: alarmInfo },
              message: 'Success Email Alarm!',
            });
        }
        // 핸드폰 알람이면, 다음을 실행한다
        else if (alarm_type === 'phone') {
          // 유저 핸드폰 번호 필드값에 번호가 존재하지 않는다면, 다음을 실행한다
          if (!userInfo.dataValues.phone_number)
            return res.status(401).json({
              data: { userInfo: userInfo },
              message: 'Not Authorized!',
            });
          // 만약 존재한다면, 다음을 실행한다
          else {
            const alarmInfo = await Alarms.create({
              phone_alarm: true,
              user_id: userInfo.dataValues.id,
              concert_id: concertid,
            });
            return res
              .status(201)
              .json({
                data: { alarmInfo: alarmInfo },
                message: 'Success Phone Alarm!',
              });
          }
        }
      }
    } catch (err) {
      console.log(err);
      return res.status(500).json({ message: 'Server Error!' });
    }
  },
  delete: async (req, res) => {
    try {
      // 로그인 인증 검사
      const userInfo = await userAuth(req, res);

      // 알람 설정을 취소할 콘서트 id를 클라이언트로부터 전달받는다
      const { concertid } = req.params;
      // 유저와 알람종류를 전달받는다
      const { alarm_type } = req.query;

      const concertInfo = await Concerts.findOne({ where: { id: concertid } });
      // 존재하지 않는다면, 다음을 실행한다
      if (!concertInfo)
        return res.status(400).json({ message: 'Not Exist Concert!' });
      // 존재한다면, 다음을 실행한다
      else {
        // 요청한 유저와 콘서트 id가 일치하는 정보를 Alarms 테이블에서 찾는다
        const alarmInfo = await Alarms.findOne({
          where: {
            user_id: userInfo.dataValues.id,
            concert_id: concertid,
          },
        });

        // 만약 일치하는 알람 정보가 없다면, 다음을 실행한다
        if (!alarmInfo)
          return res.status(400).json({ message: 'Bad Request!' });
        // 만약 일치하는 알람 정보가 있다면, 다음을 실행한다
        else {
          // 이메일 알람이면, 다음을 실행한다
          if (alarm_type === 'email') {
            const alarmDestroyInfo = await Alarms.destroy({
              where: {
                user_id: userInfo.dataValues.id,
                concert_id: concertid,
              },
            });

            return res
              .status(201)
              .json({
                data: { alarmDestroyInfo: alarmDestroyInfo },
                message: 'Delete Email Alarm!',
              });
          }
          // 카카오톡 알람이면, 다음을 실행한다
          else if (alarm_type === 'phone') {
            const alarmDestroyInfo = await Alarms.destroy({
              where: {
                user_id: userInfo.dataValues.id,
                concert_id: concertid,
              },
            });

            return res
              .status(201)
              .json({
                data: { alarmDestroyInfo: alarmDestroyInfo },
                message: 'Delete Phone Alarm!',
              });
          }
        }
      }
    } catch (err) {
      return res.status(500).json({ message: 'Server Error!' });
    }
  },
};
