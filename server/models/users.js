'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Users extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      /* Users <-> Articles (1:N) */
      models.Users.hasMany(models.Articles, {
        foreignKey: 'user_id',
        sourcekey: 'id',
        onDelete: 'cascade'
      })
      /* Users <-> ArticleComments (1:N) */
      models.Users.hasMany(models.ArticleComments, {
        foreignKey: 'user_id',
        sourcekey: 'id',
        onDelete: 'cascade'
      })
      /* Users <-> Alarms (1:N) */
      models.Users.hasMany(models.Alarms, {
        foreignKey: 'user_id',
        sourcekey: 'id',
        onDelete: 'cascade'
      })
      /* Users <-> ConcertComments (1:N) */
      models.Users.hasMany(models.ConcertComments, {
        foreignKey: 'user_id',
        sourcekey: 'id',
        onDelete: 'cascade'
      })
    }
  };
  Users.init({
    email: {
      allowNull: false,
      unique: true,
      type: DataTypes.STRING
    },
    password: {
      allowNull: false,
      type: DataTypes.STRING
    },
    username: {
      allowNull: false,
      unique: true,
      type: DataTypes.STRING
    },
    image: DataTypes.STRING,
    introduction: DataTypes.STRING,
    phone_number: {
      type: DataTypes.INTEGER,
      unique: true
    },
    birth: DataTypes.INTEGER,
    gender: DataTypes.STRING,
    role: {
      type: DataTypes.INTEGER,
      defaultValue: 3,
      allowNull: false
    },
    sign_method: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Users',
  });
  return Users;
};