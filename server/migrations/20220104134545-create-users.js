'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      email: {
        allowNull: false,
        unique: true,
        type: Sequelize.STRING
      },
      password: {
        allowNull: false,
        type: Sequelize.STRING
      },
      username: {
        allowNull: false,
        unique: true,
        type: Sequelize.STRING
      },
      image: {
        type: Sequelize.STRING
      },
      introduction: {
        type: Sequelize.STRING
      },
      phone_number: {
        type: Sequelize.STRING
      },
      birth: {
        type: Sequelize.STRING
      },
      gender: {
        type: Sequelize.STRING
      },
      role: {
        allowNull: false,
        type: Sequelize.INTEGER,
        defaultValue: 3
      },
      sign_method: {
        type: Sequelize.STRING
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
    await queryInterface.dropTable('Users');
  }
};