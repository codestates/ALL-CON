'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ArticleComments extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      /* ArticleComments <-> Users (N:1) */
      models.ArticleComments.belongsTo(models.Users, {
        foreignKey: 'user_id',
        targetKey: 'id',
        onDelete: 'cascade'
      })
      /* ArticleComments <-> Articles (N:1) */
      models.ArticleComments.belongsTo(models.Articles, {
        foreignKey: 'article_id',
        targetKey: 'id',
        onDelete: 'cascade'
      })
    }
  };
  ArticleComments.init({
    content: DataTypes.STRING,
    user_id: DataTypes.INTEGER,
    article_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'ArticleComments',
  });
  return ArticleComments;
};