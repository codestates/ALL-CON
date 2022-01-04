'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ConcertComments extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      /* ConcertComments <-> Users (N:1) */
      models.ConcertComments.belongsTo(models.Users, {
        foreignKey: 'user_id',
        targetKey: 'id',
        onDelete: 'cascade'
      })
      /* ConcertComments <-> Concerts (N:1) */
      models.ConcertComments.belongsTo(models.Concerts, {
        foreignKey: 'concert_id',
        targetKey: 'id',
        onDelete: 'cascade'
      })
    }
  };
  ConcertComments.init({
    content: DataTypes.STRING,
    user_id: DataTypes.INTEGER,
    concert_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'ConcertComments',
  });
  return ConcertComments;
};