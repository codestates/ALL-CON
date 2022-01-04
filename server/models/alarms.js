'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Alarms extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      /* Alarms <-> Users (N:1) */
      models.Alarms.belongsTo(models.Users, {
        foreignKey: 'user_id',
        targetKey: 'id',
        onDelete: 'cascade'
      })
      /* Alarms <-> Concerts (N:1) */
      models.Alarms.belongsTo(models.Concerts, {
        foreignKey: 'concert_id',
        targetKey: 'id',
        onDelete: 'cascade'
      })
    }
  };
  Alarms.init({
    email_alarm: { 
      allowNull: false,
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    kakao_alarm: {
      allowNull: false,
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    user_id: DataTypes.INTEGER,
    concert_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Alarms',
  });
  return Alarms;
};