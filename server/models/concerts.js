'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Concerts extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      /* Concerts <-> Articles (1:N) */
      models.Concerts.hasMany(models.Articles, {
        foreignKey: 'concert_id',
        sourcekey: 'id',
        onDelete: 'cascade'
      })
      /* Concerts <-> Alarms (1:N) */
      models.Concerts.hasMany(models.Alarms, {
        foreignKey: 'concert_id',
        sourcekey: 'id',
        onDelete: 'cascade'
      })
      /* Concerts <-> ConcertComments (1:N) */
      models.Concerts.hasMany(models.ConcertComments, {
        foreignKey: 'concert_id',
        sourcekey: 'id',
        onDelete: 'cascade'
      })
    }
  };
  Concerts.init({
    exclusive: DataTypes.STRING,
    open_date: DataTypes.DATE,
    post_date: DataTypes.STRING,
    image_concert: DataTypes.STRING,
    title: DataTypes.STRING,
    period: DataTypes.STRING,
    place: DataTypes.STRING,
    price: DataTypes.STRING,
    running_time: DataTypes.STRING,
    rating: DataTypes.STRING,
    link: DataTypes.STRING,
    view: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    },
    total_comment: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    }
  }, {
    sequelize,
    modelName: 'Concerts',
  });
  return Concerts;
};