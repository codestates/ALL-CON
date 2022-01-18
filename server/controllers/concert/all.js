const { userAuth } = require('../../middlewares/authorized/userAuth');
const { Alarms } = require('../../models');

module.exports = {
  get: async (req, res) => {
    try {
      // 로그인 인증 검사
      const userInfo = await userAuth(req, res);
      
      // if(!userInfo) return res.status(403).json({ message: 'Please Login!' })

      // if(!userInfo.dataValues) return res.status()
      // 나의 모든 알람 리스트
      const myAllAlarmInfo = await Alarms.findAll({
        where: { user_id: userInfo.dataValues.id },
      });
      return res.status(200).json({
        data: { myAllAlarmInfo: myAllAlarmInfo },
        message: 'Success Get My All Alarm List!',
      });
    } catch (err) {
      console.log(err);
      return res.status(500).json({ message: 'Server Error!' });
    }
  },
};
