'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Alarms', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      email_alarm: {
        allowNull: false,
        type: Sequelize.BOOLEAN,
        defaultValue: false
      },
      phone_alarm: {
        allowNull: false,
        type: Sequelize.BOOLEAN,
        defaultValue: false
      },
      user_id: {
        type: Sequelize.INTEGER,
        onDelete : 'cascade',
        references: { model: 'Users', key: 'id' }
      },
      concert_id: {
        type: Sequelize.INTEGER,
        onDelete : 'cascade',
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
    await queryInterface.dropTable('Alarms');
  }
};