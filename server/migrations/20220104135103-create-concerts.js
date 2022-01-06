'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Concerts', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      exclusive: {
        type: Sequelize.STRING
      },
      open_date: {
        type: Sequelize.DATE
      },
      post_date: {
        type: Sequelize.STRING
      },
      image_concert: {
        type: Sequelize.STRING
      },
      title: {
        type: Sequelize.STRING
      },
      period: {
        type: Sequelize.STRING
      },
      place: {
        type: Sequelize.STRING
      },
      price: {
        type: Sequelize.STRING
      },
      running_time: {
        type: Sequelize.STRING
      },
      rating: {
        type: Sequelize.STRING
      },
      link: {
        type: Sequelize.STRING
      },
      view: {
        allowNull: false,
        type: Sequelize.INTEGER,
        defaultValue: 0
      },
      total_comment: {
        allowNull: false,
        type: Sequelize.INTEGER,
        defaultValue: 0
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
    await queryInterface.dropTable('Concerts');
  }
};