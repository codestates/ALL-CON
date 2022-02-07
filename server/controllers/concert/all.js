const { userAuth } = require('../../middlewares/authorized/userAuth');
const { Alarms } = require('../../models');

module.exports = {
  get: async (req, res) => {
    try {
      // 로그인 인증 검사
      const userInfo = await userAuth(req, res);

      /* 에러 임시코드 */
      if(userInfo.dataValues){
        const myAllAlarmInfo = await Alarms.findAll({
          where: { user_id: userInfo.dataValues.id },
        });
        return res.status(200).json({
          data: { myAllAlarmInfo: myAllAlarmInfo },
          message: 'Success Get My All Alarm List!',
        });
      } else {
        // console.log("======버그(임시코드)=====");
      }
    } catch (err) {
      console.log(err);
      return res.status(500).json({ message: 'Server Error!' });
    }
  },
};
