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
        const alarmInfo = await Alarms.findOne({
          where: { 
            user_id: userInfo.dataValues.id,
            concert_id: concertInfo.id
          }
        });
        // 이미 존재하지 않는 alarmInfo라면
        if (!alarmInfo){
          // 이메일 알람이면, 다음을 실행한다
          if (alarm_type === 'email') {
            const newAlarmInfo = await Alarms.create({
              email_alarm: true,
              user_id: userInfo.dataValues.id,
              concert_id: concertid,
            });

            return res.status(201).json({
              data: { alarmInfo: newAlarmInfo },
              message: 'Success Email Alarm!',
            });
          }
          // 핸드폰 알람이면, 다음을 실행한다
          else if (alarm_type === 'phone') {
            // 유저 핸드폰 번호 필드값에 번호가 존재하지 않는다면, 다음을 실행한다
            if (!userInfo.dataValues.phone_number)
              return res.status(401).json({
                message: 'Not Authorized!',
              });
            // 만약 존재한다면, 다음을 실행한다
            else {
              const newAlarmInfo = await Alarms.create({
                phone_alarm: true,
                user_id: userInfo.dataValues.id,
                concert_id: concertid,
              });
              return res.status(201).json({
                data: { alarmInfo: newAlarmInfo },
                message: 'Success Phone Alarm!',
              });
            }
          }
        }
        // 이미 존재하는 alarmInfo라면
        else {
          // 이메일 알람이면, 다음을 실행한다
          if (alarm_type === 'email') {
            const newAlarmInfo = await alarmInfo.update({
              email_alarm: true
            });

            return res.status(200).json({
              data: { alarmInfo: newAlarmInfo },
              message: 'Success Email Alarm!',
            });
          }
          // 핸드폰 알람이면, 다음을 실행한다
          else if (alarm_type === 'phone') {
            // 유저 핸드폰 번호 필드값에 번호가 존재하지 않는다면, 다음을 실행한다
            if (!userInfo.dataValues.phone_number)
              return res.status(401).json({
                message: 'Not Authorized!',
              });
            // 만약 존재한다면, 다음을 실행한다
            else {
              const newAlarmInfo = await alarmInfo.update({
                phone_alarm: true
              });
              return res.status(200).json({
                data: { alarmInfo: newAlarmInfo },
                message: 'Success Phone Alarm!',
              });
            }
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
          // 이메일 알람과 SMS 알람 모두 1이면
          if(alarmInfo.email_alarm && alarmInfo.phone_alarm){
            // 이메일 알람이면 다음을 실행한다
            if (alarm_type === 'email') {
              const newAlarmInfo = await alarmInfo.update({
                email_alarm: false
              });
              return res.status(200).json({
                data: { alarmDestroyInfo: newAlarmInfo },
                message: 'Delete Email Alarm!',
              });
            }
            // 카카오톡 알람이면 다음을 실행한다
            else if (alarm_type === 'phone') {
              const newAlarmInfo = await alarmInfo.update({
                phone_alarm: false
              });
              return res.status(200).json({
                data: { alarmDestroyInfo: newAlarmInfo },
                message: 'Delete Phone Alarm!',
              });
            }
          }
          // 둘중 1개만 켜진 알람이라면
          else if(alarmInfo.email_alarm || alarmInfo.phone_alarm){
            // 이메일 알람만 켜진 알람 DB라면 다음을 실행한다
            if(alarmInfo.email_alarm){
              // 이메일 알람이면, 다음을 실행한다
              if (alarm_type === 'email') {
                await alarmInfo.destroy();
                return res.status(200).json({
                  message: 'Delete Alarm!'
                });
              }
              // SMS 알람이면, 다음을 실행한다
              else if (alarm_type === 'phone') {
                return res.status(400).json({ message: 'Bad Request!' });
              }
            }
            // SMS 알람만 켜진 알람 DB라면 다음을 실행한다
            else if(alarmInfo.phone_alarm){
              // 이메일 알람이면, 다음을 실행한다
              if (alarm_type === 'email') {
                return res.status(400).json({ message: 'Bad Request!' });
              }
              // SMS 알람이면, 다음을 실행한다
              else if (alarm_type === 'phone') {
                await alarmInfo.destroy();
                return res.status(200).json({
                  message: 'Delete Alarm!'
                });
              }
            }
            else {
              return res.status(400).json({ message: 'Bad Request!' });
            }
          }
        }
      }
    } catch (err) {
      return res.status(500).json({ message: 'Server Error!' });
    }
  },
};