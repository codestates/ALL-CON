'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Articles', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      title: {
        type: Sequelize.STRING
      },
      content: {
        type: Sequelize.STRING
      },
      image: {
        type: Sequelize.STRING
      },
      total_comment: {
        allowNull: false,
        type: Sequelize.INTEGER,
        defaultValue: 0
      },
      member_count: {
        allowNull: false,
        type: Sequelize.INTEGER,
        defaultValue: 1
      },
      total_member: {
        allowNull: false,
        type: Sequelize.INTEGER,
        defaultValue: 2
      },
      view: {
        allowNull: false,
        type: Sequelize.INTEGER,
        defaultValue: 0
      },
      user_id: {
        type: Sequelize.INTEGER,
        references: { model: 'Users', key: 'id' }
      },
      concert_id: {
        type: Sequelize.INTEGER,
        references: { model: 'Concerts', key: 'id' }
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Articles');
  }
};