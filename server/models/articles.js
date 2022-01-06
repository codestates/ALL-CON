'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Articles extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      /* Articles <-> ArticleComments (1:N) */
      models.Articles.hasMany(models.ArticleComments, {
        foreignKey: 'article_id',
        sourcekey: 'id',
        onDelete: 'cascade'
      })
      /* Articles <-> Users (N:1) */
      models.Articles.belongsTo(models.Users, {
        foreignKey: 'user_id',
        targetKey: 'id',
        onDelete: 'cascade'
      })
      /* Articles <-> Concerts (N:1) */
      models.Articles.belongsTo(models.Concerts, {
        foreignKey: 'concert_id',
        targetKey: 'id',
        onDelete: 'cascade'
      })
    }
  };
  Articles.init({
    title: DataTypes.STRING,
    content: DataTypes.STRING,
    image: DataTypes.STRING,
    total_comment: {
      allowNull: false,
      type: DataTypes.INTEGER,
      defaultValue: 0
    },
    member_count: {
      allowNull: false,
      type: DataTypes.INTEGER,
      defaultValue: 1
    },
    total_member: {
      allowNull: false,
      type: DataTypes.INTEGER,
      defaultValue: 2
    },
    view: {
      allowNull: false,
      type: DataTypes.INTEGER,
      defaultValue: 0
    },
    user_id: DataTypes.INTEGER,
    concert_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Articles',
  });
  return Articles;
};